/**
 * Detect media quality from URL or dimensions
 */
export interface MediaQuality {
  width?: number;
  height?: number;
  quality: 'SD' | 'HD' | 'FHD' | '2K' | '4K' | 'Unknown';
  resolution?: string;
}

/**
 * Extract dimensions from Instagram CDN URL
 */
export function detectQualityFromUrl(url: string): MediaQuality {
  // Instagram CDN URLs often contain dimensions in the path
  // Example: .../s1080x1080/... or .../1080x1080/...
  const dimensionMatch = url.match(/\/(\d+)x(\d+)\//);
  
  if (dimensionMatch) {
    const width = parseInt(dimensionMatch[1]);
    const height = parseInt(dimensionMatch[2]);
    const maxDimension = Math.max(width, height);
    
    let quality: 'SD' | 'HD' | 'FHD' | '2K' | '4K' | 'Unknown' = 'Unknown';
    
    if (maxDimension >= 3840) {
      quality = '4K';
    } else if (maxDimension >= 2560) {
      quality = '2K';
    } else if (maxDimension >= 1920) {
      quality = 'FHD';
    } else if (maxDimension >= 1280) {
      quality = 'HD';
    } else {
      quality = 'SD';
    }
    
    return {
      width,
      height,
      quality,
      resolution: `${width}x${height}`,
    };
  }
  
  return { quality: 'Unknown' };
}

/**
 * Get quality label for display
 */
export function getQualityLabel(quality: MediaQuality): string {
  if (quality.resolution) {
    return `${quality.quality} (${quality.resolution})`;
  }
  return quality.quality;
}

/**
 * Check if enhancement is recommended
 */
export function shouldRecommendEnhancement(quality: MediaQuality): boolean {
  if (!quality.width || !quality.height) return false;
  const maxDimension = Math.max(quality.width, quality.height);
  // Recommend enhancement for images below 1080p
  return maxDimension < 1920;
}
