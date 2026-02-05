import { NextRequest, NextResponse } from 'next/server';
import { scrapeInstagramPost, isPublicAccount } from '@/lib/instagram-scraper';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    if (!url.includes('instagram.com')) {
      return NextResponse.json(
        { error: 'Invalid Instagram URL' },
        { status: 400 }
      );
    }

    // Check if it's a reel URL
    const isReelUrl = url.includes('/reel/');
    if (!isReelUrl) {
      return NextResponse.json(
        { error: 'This endpoint is for reels. Please use /api/download/post for regular posts.' },
        { status: 400 }
      );
    }

    // Scrape the reel first to get username
    const reelData = await scrapeInstagramPost(url);

    if (!reelData || reelData.media.length === 0) {
      return NextResponse.json(
        { error: 'Could not extract reel from this URL. It may be private, unavailable, or the account may not be public.' },
        { status: 404 }
      );
    }

    // Filter to ensure it's a video (reels are always videos)
    const videoMedia = reelData.media.filter(m => m.type === 'video');
    
    if (videoMedia.length === 0) {
      return NextResponse.json(
        { error: 'Could not extract video from this reel. The reel may be unavailable or Instagram\'s structure has changed.' },
        { status: 404 }
      );
    }

    // Verify account is public using the extracted username
    if (reelData.username && reelData.username !== 'unknown') {
      const isPublic = await isPublicAccount(reelData.username);
      if (!isPublic) {
        return NextResponse.json(
          { error: 'Only public accounts can be downloaded. This account appears to be private.' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        ...reelData,
        media: videoMedia,
      },
    });
  } catch (error: any) {
    console.error('Error downloading reel:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to download reel' },
      { status: 500 }
    );
  }
}
