import axios from 'axios';
import * as cheerio from 'cheerio';

export interface InstagramMedia {
  url: string;
  type: 'image' | 'video';
  thumbnail?: string;
  caption?: string;
  width?: number;
  height?: number;
  quality?: string;
}

export interface InstagramPost {
  media: InstagramMedia[];
  username: string;
  timestamp?: string;
}

/**
 * Try to get post data using Instagram's oEmbed API
 */
async function tryOEmbedAPI(postUrl: string): Promise<InstagramPost | null> {
  try {
    const oembedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(postUrl)}`;
    const response = await axios.get(oembedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      timeout: 10000,
    });

    if (response.data && response.data.thumbnail_url) {
      // Extract username from author_url or title
      const username = response.data.author_url 
        ? response.data.author_url.match(/instagram\.com\/([^\/]+)/)?.[1] || 'unknown'
        : 'unknown';

      return {
        media: [{
          url: response.data.thumbnail_url,
          type: 'image', // oEmbed usually returns thumbnail
          caption: response.data.title,
        }],
        username,
      };
    }
  } catch (error: any) {
    // oEmbed API might not be available or might require authentication
    // Continue with HTML scraping
    console.log('oEmbed API failed:', error.message);
  }
  return null;
}

/**
 * Try to get post data using Instagram's embed endpoint
 */
async function tryEmbedEndpoint(postUrl: string): Promise<InstagramPost | null> {
  try {
    // Extract post/reel ID from URL - handle both /p/ and /reel/ formats
    const postIdMatch = postUrl.match(/\/(p|reel)\/([^\/\?]+)/);
    if (!postIdMatch) {
      return null;
    }
    
    const contentType = postIdMatch[1]; // 'p' or 'reel'
    const contentId = postIdMatch[2];
    
    // Use the same embed endpoint format for both posts and reels
    const embedUrl = `https://www.instagram.com/${contentType}/${contentId}/embed/`;
    
    const response = await axios.get(embedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Referer': 'https://www.instagram.com/',
      },
      timeout: 10000,
    });

    const html = response.data || '';
    const $ = cheerio.load(html);
    
    // Extract from embed page meta tags
    const ogImage = $('meta[property="og:image"]').attr('content');
    const ogVideo = $('meta[property="og:video"]').attr('content');
    const ogVideoSecure = $('meta[property="og:video:secure_url"]').attr('content');
    const ogVideoUrl = $('meta[property="og:video:url"]').attr('content');
    const ogDescription = $('meta[property="og:description"]').attr('content') || '';
    
    // For reels, prioritize video extraction
    if (contentType === 'reel' || ogVideoSecure || ogVideo || ogVideoUrl) {
      const videoUrl = ogVideoSecure || ogVideoUrl || ogVideo || '';
      if (videoUrl) {
        return {
          media: [{
            url: videoUrl,
            type: 'video',
            thumbnail: ogImage,
            caption: ogDescription,
          }],
          username: extractUsernameFromUrl(postUrl),
        };
      }
    }
    
    if (ogImage) {
      return {
        media: [{
          url: ogImage,
          type: contentType === 'reel' ? 'video' : 'image', // Reels should be video
          caption: ogDescription,
        }],
        username: extractUsernameFromUrl(postUrl),
      };
    }
  } catch (error: any) {
    console.log('Embed endpoint failed:', error.message);
  }
  return null;
}

/**
 * Extract Instagram post/reel data from public profile page
 */
export async function scrapeInstagramPost(postUrl: string): Promise<InstagramPost | null> {
  try {
    // Clean the URL - handle both /p/ and /reel/ formats
    let cleanUrl: string;
    if (postUrl.includes('instagram.com')) {
      cleanUrl = postUrl.split('?')[0];
      // Ensure URL ends with / if it's a post/reel URL
      if (!cleanUrl.endsWith('/') && (cleanUrl.includes('/p/') || cleanUrl.includes('/reel/'))) {
        cleanUrl += '/';
      }
    } else {
      // Assume it's a post ID if no domain
      cleanUrl = `https://www.instagram.com/p/${postUrl}/`;
    }

    // Try oEmbed API first (more reliable but limited)
    const oembedData = await tryOEmbedAPI(cleanUrl);
    
    // Try embed endpoint as alternative
    let embedData: InstagramPost | null = null;
    if (!oembedData) {
      embedData = await tryEmbedEndpoint(cleanUrl);
    }

    const response = await axios.get(cleanUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.instagram.com/',
        'Origin': 'https://www.instagram.com',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Cache-Control': 'max-age=0',
      },
      maxRedirects: 5,
      validateStatus: (status) => status < 500,
    });

    const html = response.data || '';
    
    // Check if Instagram is showing a login page or blocking access
    if ((html.includes('login') && html.includes('password')) || html.length < 1000) {
      // Check response status
      if (response.status === 401 || response.status === 403) {
        throw new Error('Instagram is blocking access. The post may be private or Instagram is requiring authentication.');
      }
      if (html.includes('Page Not Found') || html.includes('404')) {
        throw new Error('Post not found. The URL may be incorrect or the post may have been deleted.');
      }
      throw new Error('Instagram is requiring login or blocking automated access. Please ensure the account is public.');
    }

    const $ = cheerio.load(html);

    // Extract JSON data from script tags
    let mediaData: InstagramPost | null = embedData || oembedData || null;

    // Method 1: Look for window._sharedData (older method)
    $('script').each((_, element) => {
      const scriptContent = $(element).html() || '';
      
      if (scriptContent.includes('window._sharedData')) {
        try {
          const jsonMatch = scriptContent.match(/window\._sharedData\s*=\s*({.+?});/s);
          if (jsonMatch) {
            const data = JSON.parse(jsonMatch[1]);
            const postData = data?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;
            
            if (postData) {
              mediaData = extractMediaFromGraphQL(postData);
              return false; // Break loop
            }
          }
        } catch (e) {
          // Continue searching
        }
      }
    });

    // Method 2: Look for JSON-LD structured data
    if (!mediaData) {
      $('script[type="application/ld+json"]').each((_, element) => {
        try {
          const jsonContent = $(element).html() || '';
          const jsonLd = JSON.parse(jsonContent);
          
          if (jsonLd['@type'] === 'ImageObject' || jsonLd['@type'] === 'VideoObject') {
            mediaData = {
              media: [{
                url: jsonLd.contentUrl || jsonLd.url || '',
                type: jsonLd['@type'] === 'VideoObject' ? 'video' : 'image',
              }],
              username: extractUsernameFromUrl(cleanUrl),
            };
            return false; // Break loop
          }
        } catch (e) {
          // Continue searching
        }
      });
    }

    // Method 3: Extract from meta tags (most reliable for public posts)
    if (!mediaData) {
      // Get all meta tags
      const ogImage = $('meta[property="og:image"]').attr('content') || $('meta[name="og:image"]').attr('content');
      const ogVideo = $('meta[property="og:video"]').attr('content') || $('meta[name="og:video"]').attr('content');
      const ogVideoSecure = $('meta[property="og:video:secure_url"]').attr('content') || $('meta[name="og:video:secure_url"]').attr('content');
      const ogVideoUrl = $('meta[property="og:video:url"]').attr('content') || $('meta[name="og:video:url"]').attr('content');
      const ogVideoType = $('meta[property="og:video:type"]').attr('content');
      const ogDescription = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
      const ogTitle = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
      const ogUrl = $('meta[property="og:url"]').attr('content') || '';
      
      // Extract username from multiple sources
      let username = 'unknown';
      
      // Try to extract from og:url
      if (ogUrl) {
        const urlMatch = ogUrl.match(/instagram\.com\/([^\/\?]+)/);
        if (urlMatch && urlMatch[1] !== 'p' && urlMatch[1] !== 'reel') {
          username = urlMatch[1];
        }
      }
      
      // Try from description/title
      if (username === 'unknown') {
        const usernameMatch = (ogDescription + ' ' + ogTitle).match(/@([a-zA-Z0-9_.]+)/);
        if (usernameMatch) {
          username = usernameMatch[1];
        }
      }
      
      // Try from URL
      if (username === 'unknown') {
        username = extractUsernameFromUrl(cleanUrl);
      }
      
      // Also check for author meta tag
      const author = $('meta[name="author"]').attr('content');
      if (author) {
        username = author.replace('@', '');
      }
      
      // Check if this is a reel URL - reels are always videos
      const isReel = cleanUrl.includes('/reel/');
      
      // Check for video content
      if (isReel || ogVideoSecure || ogVideo || ogVideoUrl || ogVideoType) {
        // For videos/reels, try to get the actual video URL
        let videoUrl = ogVideoSecure || ogVideoUrl || ogVideo || '';
        
        // If we have og:video:type, it's definitely a video
        if ((ogVideoType || isReel) && !videoUrl) {
          // Try to find video source in the page
          const videoTags = $('video source, video');
          videoTags.each((_, video) => {
            const src = $(video).attr('src');
            if (src && (src.includes('cdninstagram.com') || src.includes('fbcdn.net'))) {
              videoUrl = src;
              return false; // Break
            }
          });
        }
        
        if (videoUrl) {
          mediaData = {
            media: [{
              url: videoUrl,
              type: 'video',
              thumbnail: ogImage,
              caption: ogDescription,
            }],
            username,
          };
        } else if (isReel && ogImage) {
          // For reels, if we only have thumbnail, still mark as video
          // The actual video URL might be in JavaScript
          mediaData = {
            media: [{
              url: ogImage, // Will try to find video URL below
              type: 'video',
              thumbnail: ogImage,
              caption: ogDescription,
            }],
            username,
          };
        }
      }
      
      // Check for image content
      if (!mediaData && ogImage) {
        // For images, try to get higher resolution
        let imageUrl = ogImage;
        
        // Clean up the URL - remove size parameters to potentially get original
        // But keep it if it's already a good size
        const sizeMatch = imageUrl.match(/\/(\d+)x(\d+)\//);
        if (sizeMatch && parseInt(sizeMatch[1]) < 640) {
          // Try to find higher resolution image
          const imgTags = $('img');
          imgTags.each((_, img) => {
            const src = $(img).attr('src') || $(img).attr('srcset')?.split(',')[0]?.trim().split(' ')[0] || '';
            if (src && (src.includes('cdninstagram.com') || src.includes('fbcdn.net'))) {
              const newSizeMatch = src.match(/\/(\d+)x(\d+)\//);
              if (newSizeMatch && parseInt(newSizeMatch[1]) > parseInt(sizeMatch[1])) {
                imageUrl = src.split(' ')[0]; // Take first URL from srcset
              } else if (!sizeMatch && src.includes('cdninstagram.com')) {
                // If current doesn't have size but new one does, prefer new one
                imageUrl = src.split(' ')[0];
              }
            }
          });
        }
        
        mediaData = {
          media: [{
            url: imageUrl,
            type: 'image',
            caption: ogDescription,
          }],
          username,
        };
      }
    }

    // Method 4: Try to extract from embedded JSON in script tags (newer Instagram structure)
    if (!mediaData) {
      $('script').each((_, element) => {
        const scriptContent = $(element).html() || '';
        
        // Look for JSON that might contain media URLs
        if (scriptContent.includes('display_url') || scriptContent.includes('video_url')) {
          try {
            // Try to find JSON objects with media data
            const jsonMatches = scriptContent.match(/\{[^{}]*"(display_url|video_url)"[^{}]*\}/g);
            if (jsonMatches) {
              for (const match of jsonMatches) {
                try {
                  const data = JSON.parse(match);
                  if (data.display_url || data.video_url) {
                    mediaData = {
                      media: [{
                        url: data.video_url || data.display_url,
                        type: data.video_url ? 'video' : 'image',
                        thumbnail: data.display_url,
                      }],
                      username: extractUsernameFromUrl(cleanUrl),
                    };
                    return false; // Break loop
                  }
                } catch (e) {
                  // Continue
                }
              }
            }
          } catch (e) {
            // Continue searching
          }
        }
      });
    }

    // Check if this is a reel - prioritize video extraction
    const isReel = cleanUrl.includes('/reel/');
    
    if (!mediaData || (isReel && mediaData.media[0]?.type !== 'video')) {
      // Last resort: Try to extract from any img or video tags directly
      const directVideos = $('video source[src*="cdninstagram.com"], video source[src*="fbcdn.net"], video[src*="cdninstagram.com"], video[src*="fbcdn"]');
      const directImages = $('img[src*="cdninstagram.com"], img[src*="fbcdn.net"]');
      
      // For reels, prioritize video extraction
      if (isReel || directVideos.length > 0) {
        let videoSrc = '';
        
        // Try video source tags first
        directVideos.each((_, video) => {
          const src = $(video).attr('src');
          if (src && (src.includes('cdninstagram.com') || src.includes('fbcdn'))) {
            videoSrc = src;
            return false; // Break
          }
        });
        
        // If no source tag, try video element itself
        if (!videoSrc) {
          $('video').each((_, video) => {
            const src = $(video).attr('src');
            if (src && (src.includes('cdninstagram.com') || src.includes('fbcdn'))) {
              videoSrc = src;
              return false;
            }
          });
        }
        
        // Try to extract from script tags (Instagram embeds video URLs in JSON)
        if (!videoSrc) {
          $('script').each((_, script) => {
            const scriptContent = $(script).html() || '';
            // Look for video URLs in JSON
            const videoUrlMatch = scriptContent.match(/"video_url"\s*:\s*"([^"]+)"/);
            if (videoUrlMatch) {
              videoSrc = videoUrlMatch[1].replace(/\\\//g, '/');
              return false;
            }
          });
        }
        
        if (videoSrc) {
          // Get thumbnail from existing mediaData or meta tags
          const ogImageThumb = $('meta[property="og:image"]').attr('content') || '';
          const thumbnail = mediaData?.media[0]?.thumbnail || ogImageThumb || '';
          mediaData = {
            media: [{
              url: videoSrc,
              type: 'video',
              thumbnail: thumbnail,
            }],
            username: extractUsernameFromUrl(cleanUrl),
          };
        }
      } else if (directImages.length > 0 && !isReel) {
        // Find the largest image
        let bestImage = '';
        let maxSize = 0;
        
        directImages.each((_, img) => {
          const src = $(img).attr('src') || '';
          const sizeMatch = src.match(/\/(\d+)x(\d+)\//);
          if (sizeMatch) {
            const size = parseInt(sizeMatch[1]) * parseInt(sizeMatch[2]);
            if (size > maxSize) {
              maxSize = size;
              bestImage = src;
            }
          } else if (!bestImage) {
            bestImage = src;
          }
        });
        
        if (bestImage) {
          mediaData = {
            media: [{
              url: bestImage,
              type: 'image',
            }],
            username: extractUsernameFromUrl(cleanUrl),
          };
        }
      }
    }

    if (!mediaData) {
      // Debug: Log what we found
      const debugInfo = {
        hasOgImage: !!$('meta[property="og:image"]').attr('content'),
        hasOgVideo: !!$('meta[property="og:video"]').attr('content'),
        htmlLength: html.length,
        title: $('title').text(),
        hasLoginPage: html.includes('login') && html.includes('password'),
      };
      
      console.log('Debug info:', debugInfo);
      
      throw new Error('Could not extract media from Instagram post. The page structure may have changed, the post may be private, or Instagram is blocking access. Please ensure the account is public and try again.');
    }

    return mediaData;
  } catch (error: any) {
    console.error('Error scraping Instagram post:', error.message);
    throw new Error(`Failed to scrape Instagram post: ${error.message}`);
  }
}

/**
 * Extract media from GraphQL response structure
 */
function extractMediaFromGraphQL(postData: any): InstagramPost {
  const media: InstagramMedia[] = [];
  const username = postData.owner?.username || '';

  if (postData.__typename === 'GraphSidecar') {
    // Carousel post with multiple media
    postData.edge_sidecar_to_children?.edges?.forEach((edge: any) => {
      const node = edge.node;
      if (node.is_video) {
        media.push({
          url: node.video_url,
          type: 'video',
          thumbnail: node.display_url,
        });
      } else {
        media.push({
          url: node.display_url,
          type: 'image',
        });
      }
    });
  } else if (postData.is_video) {
    // Single video/reel
    media.push({
      url: postData.video_url,
      type: 'video',
      thumbnail: postData.display_url,
      caption: postData.edge_media_to_caption?.edges?.[0]?.node?.text,
    });
  } else {
    // Single image
    media.push({
      url: postData.display_url,
      type: 'image',
      caption: postData.edge_media_to_caption?.edges?.[0]?.node?.text,
    });
  }

  return {
    media,
    username,
    timestamp: postData.taken_at_timestamp?.toString(),
  };
}

/**
 * Extract username from Instagram URL
 */
function extractUsernameFromUrl(url: string): string {
  // Handle different URL formats
  const patterns = [
    /instagram\.com\/([^\/\?]+)/,  // Standard format
    /instagram\.com\/p\/[^\/]+\/.*?@([^\/\s]+)/,  // URL with @username in path
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1].replace('@', '');
    }
  }
  
  return 'unknown';
}

/**
 * Scrape Instagram profile to get post URLs
 */
export async function scrapeInstagramProfile(username: string): Promise<string[]> {
  try {
    const profileUrl = `https://www.instagram.com/${username}/`;
    const response = await axios.get(profileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const postUrls: string[] = [];

    // Extract post URLs from page
    $('a[href*="/p/"]').each((_, element) => {
      const href = $(element).attr('href');
      if (href && !postUrls.includes(href)) {
        postUrls.push(`https://www.instagram.com${href}`);
      }
    });

    return postUrls;
  } catch (error: any) {
    throw new Error(`Failed to scrape profile: ${error.message}`);
  }
}

/**
 * Check if account is public by attempting to access profile
 */
export async function isPublicAccount(username: string): Promise<boolean> {
  try {
    // Clean username (remove @ if present)
    const cleanUsername = username.replace('@', '').trim();
    
    if (!cleanUsername || cleanUsername === 'unknown') {
      return true; // Assume public if we can't determine
    }

    const profileUrl = `https://www.instagram.com/${cleanUsername}/`;
    const response = await axios.get(profileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.instagram.com/',
      },
      validateStatus: (status) => status < 500,
      maxRedirects: 5,
    });

    const html = response.data || '';
    
    // Check for signs of private account
    const isPrivate = html.includes('This Account is Private') || 
                     html.includes('This account is private') ||
                     html.includes('followers') && html.includes('login') ||
                     response.status === 404;

    // If we can see the profile content, it's likely public
    if (response.status === 200 && !isPrivate && html.length > 10000) {
      return true;
    }

    // If we got media from the post, assume it's public (since we could access it)
    return !isPrivate;
  } catch (error: any) {
    // If we can't determine, assume public (since we already got the post data)
    console.log('Could not verify account privacy:', error.message);
    return true;
  }
}
