import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import sharp from 'sharp';

/**
 * Enhance image quality using Sharp (local processing)
 * For production, you might want to use an AI upscaling service
 */
export async function POST(request: NextRequest) {
  try {
    const { imageUrl, enhancement } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Fetch the image
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.instagram.com/',
      },
    });

    const imageBuffer = Buffer.from(imageResponse.data);
    
    // Get original dimensions
    const metadata = await sharp(imageBuffer).metadata();
    const originalWidth = metadata.width || 0;
    const originalHeight = metadata.height || 0;

    let processedBuffer: Buffer;
    let newWidth: number;
    let newHeight: number;

    switch (enhancement) {
      case '2x':
        // 2x upscale
        newWidth = originalWidth * 2;
        newHeight = originalHeight * 2;
        processedBuffer = await sharp(imageBuffer)
          .resize(newWidth, newHeight, {
            kernel: sharp.kernel.lanczos3,
            fit: 'fill',
          })
          .sharpen()
          .toBuffer();
        break;
      
      case '4x':
        // 4x upscale
        newWidth = originalWidth * 4;
        newHeight = originalHeight * 4;
        processedBuffer = await sharp(imageBuffer)
          .resize(newWidth, newHeight, {
            kernel: sharp.kernel.lanczos3,
            fit: 'fill',
          })
          .sharpen()
          .toBuffer();
        break;
      
      case 'hd':
        // Upscale to HD (1920px max dimension)
        const maxDimension = Math.max(originalWidth, originalHeight);
        if (maxDimension < 1920) {
          const scale = 1920 / maxDimension;
          newWidth = Math.round(originalWidth * scale);
          newHeight = Math.round(originalHeight * scale);
          processedBuffer = await sharp(imageBuffer)
            .resize(newWidth, newHeight, {
              kernel: sharp.kernel.lanczos3,
              fit: 'fill',
            })
            .sharpen()
            .toBuffer();
        } else {
          // Already HD or better, just sharpen
          processedBuffer = await sharp(imageBuffer)
            .sharpen()
            .toBuffer();
          newWidth = originalWidth;
          newHeight = originalHeight;
        }
        break;
      
      case 'sharpen':
        // Just sharpen without upscaling
        processedBuffer = await sharp(imageBuffer)
          .sharpen()
          .toBuffer();
        newWidth = originalWidth;
        newHeight = originalHeight;
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid enhancement type' },
          { status: 400 }
        );
    }

    return new NextResponse(processedBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="instagram-enhanced-${Date.now()}.jpg"`,
        'X-Original-Resolution': `${originalWidth}x${originalHeight}`,
        'X-Enhanced-Resolution': `${newWidth}x${newHeight}`,
      },
    });
  } catch (error: any) {
    console.error('Error enhancing image:', error);
    
    // If sharp is not available, return error with suggestion
    if (error.message?.includes('sharp') || error.code === 'MODULE_NOT_FOUND') {
      return NextResponse.json(
        { 
          error: 'Image enhancement requires sharp package. Install it with: npm install sharp',
          fallback: true 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to enhance image' },
      { status: 500 }
    );
  }
}
