import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          {/* Left side - Brand name */}
          <div className="text-gray-900 font-semibold text-lg sm:text-xl">
            IG Reels Download
          </div>
          
          {/* Right side - Links in single line */}
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6 text-sm sm:text-base">
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              About Us
            </Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <Link 
              href="/privacy-policy" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <Link 
              href="/terms-conditions" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Terms & Conditions
            </Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <Link 
              href="/contact" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
