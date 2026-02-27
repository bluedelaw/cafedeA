"use client"

import React from "react"
import Link from "next/link"
import { Shield, Mail, Phone, MapPin } from "lucide-react"

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent font-tempus">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last Updated: February 26, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tempus">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              café de A ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{" "}
              <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium">
                cafedea.ca
              </Link>{" "}
              and use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tempus">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Personal Information You Provide</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you use our contact form or interact with our services, we may collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Message content and inquiry details</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Information Collected Automatically</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you visit our website, we may automatically collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tempus">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Respond to your inquiries and requests</li>
              <li>Process catering and reservation requests</li>
              <li>Improve our website and services</li>
              <li>Send you information you've requested</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tempus">Third-Party Services</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Email Services (Resend)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use Resend to process and deliver contact form submissions. Information submitted through our contact form is transmitted to Resend for email delivery purposes.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Google Maps</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website uses Google Maps to display our restaurant location. Google may collect data about your use of the map feature. Please review{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-medium">
                Google's Privacy Policy
              </a>{" "}
              for more information.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Uber Eats</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We provide links to Uber Eats for delivery services. When you use Uber Eats, you will be subject to{" "}
              <a href="https://www.uber.com/legal/en/document/?name=privacy-notice" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-medium">
                Uber's Privacy Policy
              </a>.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">POS King (Online Ordering)</h3>
            <p className="text-gray-700 leading-relaxed">
              Our online ordering system is provided by POS King. When you place an order, you will be subject to POS King's privacy practices.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tempus">Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device. You can control cookie settings through your browser preferences.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tempus">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tempus">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tempus">Your Privacy Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to processing of your personal information</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us using the information below.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tempus">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tempus">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tempus">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <span>#3050-11666 Steveston Hwy, Richmond, BC V7A 5J3</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <a href="tel:+16042767800" className="hover:text-teal-600 transition-colors">
                  (604) 276-7800
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <a href="mailto:inquiry@cafedea.ca" className="hover:text-teal-600 transition-colors">
                  inquiry@cafedea.ca
                </a>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tempus">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy is governed by the laws of British Columbia, Canada, without regard to its conflict of law provisions.
            </p>
          </section>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
