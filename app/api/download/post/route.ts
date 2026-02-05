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

    // Scrape the post first to get username
    const postData = await scrapeInstagramPost(url);

    if (!postData || postData.media.length === 0) {
      return NextResponse.json(
        { error: 'Could not extract media from this post. It may be private, unavailable, or the account may not be public.' },
        { status: 404 }
      );
    }

    // Verify account is public using the extracted username
    if (postData.username && postData.username !== 'unknown') {
      const isPublic = await isPublicAccount(postData.username);
      if (!isPublic) {
        return NextResponse.json(
          { error: 'Only public accounts can be downloaded. This account appears to be private.' },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: postData,
    });
  } catch (error: any) {
    console.error('Error downloading post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to download post' },
      { status: 500 }
    );
  }
}
