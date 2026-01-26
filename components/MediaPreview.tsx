'use client';

import { useState, useEffect } from 'react';
import { detectQualityFromUrl, getQualityLabel, shouldRecommendEnhancement, MediaQuality } from '@/lib/quality-detector';

interface MediaPreviewProps {
  data: {
    media: Array<{
      url: string;
      type: 'image' | 'video';
      thumbnail?: string;
      caption?: string;
    }>;
    username: string;
    timestamp?: string;
  };
}

export default function MediaPreview({ data }: MediaPreviewProps) {
  const [qualityInfo, setQualityInfo] = useState<Record<number, MediaQuality>>({});
  const [enhancing, setEnhancing] = useState<Record<number, boolean>>({});
  const [showEnhanceOptions, setShowEnhanceOptions] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Detect quality for each media item
    const qualities: Record<number, MediaQuality> = {};
    data.media.forEach((media, index) => {
      qualities[index] = detectQualityFromUrl(media.url);
    });
    setQualityInfo(qualities);
  }, [data.media]);

  const downloadMedia = async (mediaUrl: string, type: 'image' | 'video', index: number, enhanced: boolean = false) => {
    try {
      if (enhanced && type === 'image') {
        // Use enhancement API
        const response = await fetch('/api/enhance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrl: mediaUrl,
            enhancement: 'hd', // Default to HD enhancement
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.fallback) {
            alert('Enhancement feature requires server setup. Downloading original quality instead.');
            downloadMedia(mediaUrl, type, index, false);
            return;
          }
          throw new Error('Failed to enhance image');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const enhancedRes = response.headers.get('X-Enhanced-Resolution') || 'enhanced';
        a.download = `instagram-${data.username}-${index + 1}-${enhancedRes}.jpg`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        // Regular download
        const response = await fetch(`/api/download/media?url=${encodeURIComponent(mediaUrl)}&type=${type}`);
        
        if (!response.ok) {
          throw new Error('Failed to download media');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `instagram-${data.username}-${index + 1}.${type === 'video' ? 'mp4' : 'jpg'}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download media. Please try again.');
    }
  };

  const enhanceImage = async (imageUrl: string, index: number, enhancement: string) => {
    setEnhancing({ ...enhancing, [index]: true });
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          enhancement,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.fallback) {
          alert('Enhancement feature requires server setup. Please install sharp: npm install sharp');
          return;
        }
        throw new Error('Failed to enhance image');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const enhancedRes = response.headers.get('X-Enhanced-Resolution') || 'enhanced';
      a.download = `instagram-${data.username}-${index + 1}-${enhancedRes}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Enhancement error:', error);
      alert('Failed to enhance image. Please try again.');
    } finally {
      setEnhancing({ ...enhancing, [index]: false });
      setShowEnhanceOptions({ ...showEnhanceOptions, [index]: false });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="border-b border-gray-200 pb-3 sm:pb-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
            @
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            {data.username}
          </h2>
        </div>
        {data.timestamp && (
          <p className="text-xs sm:text-sm text-gray-500 ml-11 sm:ml-13">
            Posted: {new Date(parseInt(data.timestamp) * 1000).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {data.media.map((media, index) => {
          const quality = qualityInfo[index] || { quality: 'Unknown' as const };
          const showEnhance = showEnhanceOptions[index] || false;
          const isEnhancing = enhancing[index] || false;
          const recommendEnhance = media.type === 'image' && shouldRecommendEnhancement(quality);

          return (
            <div key={index} className="border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div className="relative bg-black flex items-center justify-center" style={{ minHeight: '250px', maxHeight: '600px' }}>
                {media.type === 'video' ? (
                  <video
                    src={media.url}
                    controls
                    className="w-full h-auto max-h-[500px] sm:max-h-[600px]"
                    poster={media.thumbnail}
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={media.url}
                    alt={`${data.username} - Media ${index + 1}`}
                    className="w-full h-auto max-h-[500px] sm:max-h-[600px] object-contain"
                    loading="lazy"
                  />
                )}
              </div>
              
             
              
              {media.caption && (
                <div className="p-3 sm:p-4 bg-gray-50 border-b border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-700 line-clamp-3 leading-relaxed">{media.caption}</p>
                </div>
              )}

              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {/* Download Original */}
                <button
                  onClick={() => downloadMedia(media.url, media.type, index, false)}
                  disabled={isEnhancing}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 sm:py-3.5 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-md shadow-green-500/30 hover:shadow-lg hover:shadow-green-500/40 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Original {media.type === 'video' ? 'Video' : 'Image'}
                  </span>
                </button>

                {/* Enhancement Options for Images */}
                {media.type === 'image' && (
                  <>
                    {recommendEnhance && !showEnhance && (
                      <button
                        onClick={() => setShowEnhanceOptions({ ...showEnhanceOptions, [index]: true })}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-2.5 sm:py-3 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all text-sm sm:text-base shadow-md shadow-purple-500/30 hover:shadow-lg hover:shadow-purple-500/40 transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span className="flex items-center justify-center">
                          <span className="mr-2">✨</span>
                          Enhance Quality
                        </span>
                      </button>
                    )}

                    {showEnhance && (
                      <div className="space-y-3 pt-3 border-t border-gray-200">
                        <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Enhancement Options:</p>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            onClick={() => enhanceImage(media.url, index, 'sharpen')}
                            disabled={isEnhancing}
                            className="px-3 py-2.5 sm:py-3 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-all transform active:scale-95 shadow-sm"
                          >
                            {isEnhancing ? '...' : 'Sharpen'}
                          </button>
                          <button
                            onClick={() => enhanceImage(media.url, index, 'hd')}
                            disabled={isEnhancing}
                            className="px-3 py-2.5 sm:py-3 bg-purple-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-all transform active:scale-95 shadow-sm"
                          >
                            {isEnhancing ? '...' : 'HD (2K)'}
                          </button>
                          <button
                            onClick={() => enhanceImage(media.url, index, '2x')}
                            disabled={isEnhancing}
                            className="px-3 py-2.5 sm:py-3 bg-pink-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-pink-600 disabled:opacity-50 transition-all transform active:scale-95 shadow-sm"
                          >
                            {isEnhancing ? '...' : '2x Scale'}
                          </button>
                          <button
                            onClick={() => enhanceImage(media.url, index, '4x')}
                            disabled={isEnhancing}
                            className="px-3 py-2.5 sm:py-3 bg-indigo-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition-all transform active:scale-95 shadow-sm"
                          >
                            {isEnhancing ? '...' : '4x Scale'}
                          </button>
                        </div>
                        <button
                          onClick={() => setShowEnhanceOptions({ ...showEnhanceOptions, [index]: false })}
                          className="w-full text-xs sm:text-sm text-gray-500 hover:text-gray-700 mt-2 py-1.5 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {data.media.length > 1 && (
        <div className="mt-4 sm:mt-6">
          <button
            onClick={() => {
              data.media.forEach((media, index) => {
                setTimeout(() => {
                  downloadMedia(media.url, media.type, index, false);
                }, index * 500);
              });
            }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 sm:py-5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:scale-[1.02] active:scale-[0.98] text-base sm:text-lg"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download All ({data.media.length} files)
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
