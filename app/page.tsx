'use client';

import { useState } from 'react';
import DownloadForm from '@/components/DownloadForm';
import MediaPreview from '@/components/MediaPreview';
import Footer from '@/components/Footer';

export default function Home() {
  const [downloadData, setDownloadData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detect content type from URL
  const detectContentType = (url: string): 'post' | 'reel' | null => {
    if (!url || !url.includes('instagram.com')) {
      return null;
    }
    
    if (url.includes('/reel/') || url.includes('/reels/')) {
      return 'reel';
    }
    
    if (url.includes('/p/')) {
      return 'post';
    }
    
    return null;
  };

  const handleDownload = async (url: string, type: 'post' | 'reel') => {
    setLoading(true);
    setError(null);
    setDownloadData(null);

    try {
      // Double-check: Detect actual content type from URL
      const detectedType = detectContentType(url);
      const finalType = detectedType || type;
      
      // Use the correct endpoint based on detected type
      const endpoint = finalType === 'reel' ? '/api/download/reel' : '/api/download/post';
      const body = { url };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to download');
      }

      if (data.success) {
        setDownloadData(data.data);
      } else {
        throw new Error(data.message || data.error || 'Download failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SEO: Hidden heading for better structure */}
      <h1 className="sr-only">Instagram Downloader - Free Instagram Post and Reel Downloader</h1>
      
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <span className="text-3xl sm:text-4xl">📥</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Instagram Downloader
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-2 sm:mb-3 font-medium">
              Download Posts & Reels in HD Quality
            </p>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Free • Fast • No Login Required
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full">
                ✨ HD Quality
              </span>
              <span className="px-3 py-1.5 bg-purple-100 text-purple-800 text-xs sm:text-sm font-medium rounded-full">
                🚀 Fast Download
              </span>
              <span className="px-3 py-1.5 bg-green-100 text-green-800 text-xs sm:text-sm font-medium rounded-full">
                🔒 100% Free
              </span>
              <span className="px-3 py-1.5 bg-pink-100 text-pink-800 text-xs sm:text-sm font-medium rounded-full">
                📱 Mobile Friendly
              </span>
            </div>
          </div>

          {/* Download Form Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 border border-gray-100">
            <DownloadForm 
              onDownload={handleDownload} 
              loading={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 sm:mb-8 animate-fade-in">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm sm:text-base text-red-800 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Media Preview */}
          {downloadData && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 animate-fade-in">
              <MediaPreview data={downloadData} />
            </div>
          )}

          {/* How It Works Section */}
          {!downloadData && !loading && (
            <div className="mt-8 sm:mt-12 md:mt-16">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
                How It Works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">1️⃣</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Paste URL</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Copy Instagram post or reel URL</p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">2️⃣</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Click Download</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Select content type and download</p>
                </div>
                <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">3️⃣</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Get Your Media</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Download in original or enhanced quality</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
