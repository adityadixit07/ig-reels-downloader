import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - IG Reels Download',
  description: 'Learn about IG Reels Download - Free Instagram post and reel downloader. Our mission, features, and commitment to users.',
};

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 sm:mb-8 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            About Us
          </h1>
          
          <div className="text-gray-700 space-y-6 sm:space-y-8 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                Our Mission
              </h2>
              <p>
                IG Reels Download is a free, user-friendly platform designed to help users download Instagram posts and reels from public accounts. We believe that users should have easy access to content they want to save, and we've built our service to make this process simple, fast, and secure.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                What We Offer
              </h2>
              <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
                <li><strong>Free Downloads:</strong> Download Instagram posts and reels without any cost</li>
                <li><strong>HD Quality:</strong> Get your content in the highest available quality</li>
                <li><strong>Quality Enhancement:</strong> Enhance image quality with our AI-powered upscaling options</li>
                <li><strong>No Login Required:</strong> Use our service without creating an account</li>
                <li><strong>Mobile Friendly:</strong> Works seamlessly on all devices - desktop, tablet, and mobile</li>
                <li><strong>Fast & Secure:</strong> Quick downloads with privacy-focused processing</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                Our Commitment
              </h2>
              <p>
                We are committed to providing a reliable, secure, and user-friendly service. We respect user privacy, do not store personal data, and only work with public Instagram content. We believe in transparency and have clear policies regarding privacy, terms of service, and user rights.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                Privacy & Security
              </h2>
              <p>
                Your privacy is important to us. We do not store your personal information or downloaded content on our servers. All processing is done in real-time, and we maintain strict security measures to protect user data. For more details, please read our{' '}
                <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline font-medium">
                  Privacy Policy
                </Link>.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                Legal & Ethical Use
              </h2>
              <p>
                We only support downloading content from public Instagram accounts. Users are responsible for ensuring they have the right to download and use any content. We respect copyright and intellectual property rights and encourage users to do the same. Please review our{' '}
                <Link href="/terms-conditions" className="text-blue-600 hover:text-blue-700 underline font-medium">
                  Terms & Conditions
                </Link>{' '}
                for more information.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                Contact Us
              </h2>
              <p>
                Have questions, feedback, or suggestions? We'd love to hear from you! Reach out to us at:{' '}
                <a 
                  href="mailto:officialadityadixit@gmail.com" 
                  className="text-blue-600 hover:text-blue-700 underline font-medium"
                >
                  officialadityadixit@gmail.com
                </a>
              </p>
            </section>
            
            <section className="bg-blue-50 rounded-lg p-6 sm:p-8 border border-blue-100">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Thank You
              </h2>
              <p className="text-gray-700">
                Thank you for using IG Reels Download. We're constantly working to improve our service and appreciate your support. If you find our service helpful, please share it with others!
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
