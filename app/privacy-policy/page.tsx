import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - IG Reels Download',
  description: 'Privacy Policy for IG Reels Download - Learn how we handle your data and protect your privacy.',
};

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          
          <div className="text-gray-700 space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed">
            <p className="text-gray-600 text-xs sm:text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                1. Introduction
              </h2>
              <p>
                Welcome to IG Reels Download. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you use our service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                2. Information We Collect
              </h2>
              <p>
                We collect minimal information necessary to provide our service:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>Instagram URLs that you paste into our service</li>
                <li>Technical information such as IP address, browser type, and device information</li>
                <li>Usage data to improve our service</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                3. How We Use Your Information
              </h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>Process your download requests</li>
                <li>Improve our service and user experience</li>
                <li>Analyze usage patterns and troubleshoot issues</li>
                <li>Ensure the security and integrity of our service</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                4. Data Storage and Security
              </h2>
              <p>
                We do not store your personal information or downloaded content on our servers. All processing is done in real-time, and we do not maintain a database of user downloads or personal data.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                5. Third-Party Services
              </h2>
              <p>
                Our service may use third-party analytics and hosting services. These services may collect information about your use of our website in accordance with their own privacy policies.
              </p>
              <p className="mt-3">
                <strong>Google AdSense:</strong> We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and similar technologies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting{' '}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline font-medium"
                >
                  Google's Ads Settings
                </a>
                {' '}or{' '}
                <a 
                  href="https://www.aboutads.info/choices/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline font-medium"
                >
                  optout.aboutads.info
                </a>.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                6. Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience, analyze usage, improve our service, and serve personalized advertisements. Cookies are small text files stored on your device when you visit our website.
              </p>
              <p className="mt-3">
                <strong>Types of cookies we use:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Advertising Cookies:</strong> Used by Google AdSense and other advertising partners to deliver relevant ads</li>
              </ul>
              <p className="mt-3">
                You can control cookie preferences through your browser settings. However, disabling cookies may affect the functionality of our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                7. Your Rights
              </h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>Access information we may have about you</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of certain data collection practices</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                8. Children's Privacy
              </h2>
              <p>
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                10. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:{' '}
                <a 
                  href="mailto:officialadityadixit@gmail.com" 
                  className="text-blue-600 hover:text-blue-700 underline font-medium"
                >
                  officialadityadixit@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
