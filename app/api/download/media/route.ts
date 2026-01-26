import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Mark as dynamic since it uses searchParams
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const mediaUrl = searchParams.get('url');
    const type = searchParams.get('type') || 'image';

    if (!mediaUrl) {
      return NextResponse.json(
        { error: 'Media URL is required' },
        { status: 400 }
      );
    }

    // Fetch the media file
    const response = await axios.get(mediaUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.instagram.com/',
      },
    });

    const contentType = type === 'video' 
      ? 'video/mp4' 
      : response.headers['content-type'] || 'image/jpeg';

    return new NextResponse(response.data, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="instagram-${Date.now()}.${type === 'video' ? 'mp4' : 'jpg'}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error: any) {
    console.error('Error downloading media:', error);
    return NextResponse.json(
      { error: 'Failed to download media file' },
      { status: 500 }
    );
  }
}
