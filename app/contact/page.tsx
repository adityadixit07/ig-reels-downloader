import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us - IG Reels Download',
  description: 'Contact IG Reels Download for support, questions, or feedback.',
};

export default function Contact() {
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
            Contact Us
          </h1>
          
          <div className="text-gray-700 space-y-6 sm:space-y-8 text-sm sm:text-base leading-relaxed">
            <section>
              <p className="text-lg sm:text-xl text-gray-800 mb-4">
                We'd love to hear from you! If you have any questions, feedback, or concerns, please don't hesitate to reach out to us.
              </p>
            </section>
            
            <section className="bg-blue-50 rounded-lg p-6 sm:p-8 border border-blue-100">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Email Us
              </h2>
              <p className="mb-4 text-gray-700">
                For any inquiries, support requests, or general questions, please send us an email at:
              </p>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href="mailto:officialadityadixit@gmail.com" 
                  className="text-blue-600 hover:text-blue-700 text-lg sm:text-xl font-semibold underline transition-colors"
                >
                  officialadityadixit@gmail.com
                </a>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 mt-6 sm:mt-8">
                Response Time
              </h2>
              <p className="text-gray-700">
                We aim to respond to all inquiries within 24-48 hours during business days. Thank you for your patience!
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 mt-6 sm:mt-8">
                What to Include in Your Email
              </h2>
              <p className="text-gray-700 mb-3">To help us assist you better, please include:</p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
                <li>A clear subject line describing your inquiry</li>
                <li>Detailed description of your question or issue</li>
                <li>Any relevant URLs or screenshots (if applicable)</li>
                <li>Your contact information (optional)</li>
              </ul>
            </section>
            
            <section className="bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Other Ways to Reach Us
              </h2>
              <p className="text-gray-700">
                For general questions about our service, you can also check our{' '}
                <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline font-medium">
                  Privacy Policy
                </Link>
                {' '}and{' '}
                <Link href="/terms-conditions" className="text-blue-600 hover:text-blue-700 underline font-medium">
                  Terms & Conditions
                </Link>
                {' '}pages for more information.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
