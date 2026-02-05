import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions - IG Reels Download',
  description: 'Terms and Conditions for IG Reels Download - Read our terms of service and usage guidelines.',
};

export default function TermsConditions() {
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
            Terms & Conditions
          </h1>
          
          <div className="text-gray-700 space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed">
            <p className="text-gray-600 text-xs sm:text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using IG Reels Download, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms & Conditions, please do not use our service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                2. Use of Service
              </h2>
              <p>You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>Use the service to download content from private accounts without permission</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the intellectual property rights of others</li>
                <li>Use the service for any commercial purposes without authorization</li>
                <li>Attempt to interfere with or disrupt the service</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                3. Content Ownership
              </h2>
              <p>
                All content downloaded through our service remains the property of its original creators and copyright holders. We do not claim ownership of any content downloaded through our service. Users are responsible for ensuring they have the right to download and use any content.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                4. Service Availability
              </h2>
              <p>
                We strive to provide a reliable service, but we do not guarantee that the service will be available at all times. The service may be temporarily unavailable due to maintenance, updates, or unforeseen circumstances.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                5. Limitation of Liability
              </h2>
              <p>
                IG Reels Download is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use or inability to use our service, including but not limited to direct, indirect, incidental, or consequential damages.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                6. Intellectual Property
              </h2>
              <p>
                The service itself, including its design, functionality, and code, is the intellectual property of IG Reels Download. You may not copy, modify, or distribute any part of our service without permission.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                7. User Responsibilities
              </h2>
              <p>You are responsible for:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>Ensuring you have the right to download content</li>
                <li>Complying with Instagram's Terms of Service</li>
                <li>Respecting copyright and intellectual property rights</li>
                <li>Using downloaded content in accordance with applicable laws</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                8. Prohibited Uses
              </h2>
              <p>You may not use our service to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>Download content from private accounts without authorization</li>
                <li>Violate any laws or regulations</li>
                <li>Harass, abuse, or harm others</li>
                <li>Transmit viruses or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                9. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes are posted constitutes acceptance of the modified terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                10. Termination
              </h2>
              <p>
                We reserve the right to terminate or suspend access to our service at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">
                11. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms & Conditions, please contact us at:{' '}
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
