'use client';

import { useState, useEffect } from 'react';

interface DownloadFormProps {
  onDownload: (url: string, type: 'post' | 'reel') => void;
  loading: boolean;
}

/**
 * Detect content type from Instagram URL
 */
function detectContentType(url: string): 'post' | 'reel' | null {
  if (!url || !url.includes('instagram.com')) {
    return null;
  }
  
  // Check for reel URL
  if (url.includes('/reel/') || url.includes('/reels/')) {
    return 'reel';
  }
  
  // Check for post URL
  if (url.includes('/p/')) {
    return 'post';
  }
  
  return null;
}

export default function DownloadForm({ onDownload, loading }: DownloadFormProps) {
  const [url, setUrl] = useState('');
  const [type, setType] = useState<'post' | 'reel'>('post');
  const [autoDetected, setAutoDetected] = useState(false);

  // Auto-detect content type when URL changes
  useEffect(() => {
    if (!url.trim()) return;
    
    const detectedType = detectContentType(url);
    if (detectedType) {
      // Use functional update to avoid dependency on type
      setType((currentType) => {
        if (detectedType !== currentType) {
          setAutoDetected(true);
          setTimeout(() => setAutoDetected(false), 2000);
          return detectedType;
        }
        return currentType;
      });
    }
  }, [url]); // Only depend on url, not type to avoid loops

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    // Detect content type from URL
    const detectedType = detectContentType(newUrl);
    if (detectedType) {
      setType(detectedType);
      setAutoDetected(true);
      setTimeout(() => setAutoDetected(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      // Double-check content type before submitting
      const detectedType = detectContentType(url.trim());
      const finalType = detectedType || type;
      onDownload(url.trim(), finalType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      {/* Content Type Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="type" className="block text-sm sm:text-base font-semibold text-gray-800">
            Select Content Type
          </label>
          {autoDetected && (
            <span className="text-xs sm:text-sm text-green-600 font-medium animate-fade-in flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Auto-detected
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => {
              setType('post');
              setAutoDetected(false);
            }}
            disabled={loading}
            className={`px-4 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all transform active:scale-95 ${
              type === 'post'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-pressed={type === 'post'}
          >
            <span className="block sm:inline">📸</span> <span className="hidden sm:inline"> </span>
            Post
          </button>
          <button
            type="button"
            onClick={() => {
              setType('reel');
              setAutoDetected(false);
            }}
            disabled={loading}
            className={`px-4 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all transform active:scale-95 ${
              type === 'reel'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-pressed={type === 'reel'}
          >
            <span className="block sm:inline">🎬</span> <span className="hidden sm:inline"> </span>
            Reel
          </button>
        </div>
      </div>

      {/* URL Input */}
      <div>
        <label htmlFor="url" className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
          Instagram URL
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <input
            type="url"
            id="url"
            value={url}
            onChange={handleUrlChange}
            onPaste={(e) => {
              // Handle paste event to detect URL type immediately
              setTimeout(() => {
                const pastedUrl = e.currentTarget.value;
                const detectedType = detectContentType(pastedUrl);
                if (detectedType) {
                  setType(detectedType);
                  setAutoDetected(true);
                  setTimeout(() => setAutoDetected(false), 2000);
                }
              }, 0);
            }}
            placeholder="https://www.instagram.com/p/ABC123xyz/"
            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
            required
            disabled={loading}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
          <span className="font-medium">Example:</span> https://www.instagram.com/p/ABC123xyz/ or https://www.instagram.com/reel/ABC123xyz/
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !url.trim()}
        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-4 sm:py-5 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-[1.02] active:scale-[0.98] text-base sm:text-lg"
        aria-busy={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 sm:h-6 sm:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Downloading...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Now
          </span>
        )}
      </button>
    </form>
  );
}
