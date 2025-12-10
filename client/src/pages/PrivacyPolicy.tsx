import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-white py-20 mt-20">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Privacy Policy
            </h1>
          </div>          
          <p className="text-sm text-white/80 mt-2">Effective Date: January 31, 2025</p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="flex-1 py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 md:p-12">
              {/* Introduction Section */}
              <div className="mb-10">
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  Acesynergi Solutions ("Acesynergi Solutions," "we," "our," or "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services, visit our website{" "}
                  <a
                    href="https://www.acesynergi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors underline font-medium"
                  >
                    www.acesynergi.com
                  </a>
                  , access our LMS, interact with our learning and AI tools, or engage with us through any communication channel or community platform.
                </p>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  By accessing our website, enrolling in our programs, joining our online communities, or using our services, you agree to the terms outlined in this Privacy Policy.
                </p>
              </div>

              {/* Information We Collect Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  1. Information We Collect
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  We may collect and process the following categories of information:
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                      a. Personal Identification Information
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                      <li>Full name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Job title, role, and organization</li>
                      <li>Mailing or billing address</li>
                      <li>Government-issued ID (only if required for certification or exam accreditation)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                      b. Payment and Transaction Information
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                      <li>Billing details</li>
                      <li>Payment method details (processed securely through third-party payment gateways; we do not store full card details)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                      c. Technical and Usage Information
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                      <li>IP address</li>
                      <li>Browser type, version, and device information</li>
                      <li>Operating system</li>
                      <li>Access logs, session activity, LMS usage, and analytics data</li>
                      <li>Cookies, pixels, and similar tracking technologies</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                      d. Learning, Certification, and LMS Information
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                      <li>Courses enrolled</li>
                      <li>Attendance and participation records</li>
                      <li>Assignments, assessments, and scores</li>
                      <li>Certification status and credentials</li>
                      <li>Learning behavior and interaction data (including AI-assisted learning insights)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                      e. Communication and Interaction Information
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                      <li>Emails, messages, or calls you exchange with us</li>
                      <li>Chatbot or AI-tool interactions (for service improvement)</li>
                      <li>Posts or participation in Acesynergi community groups</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  2. How We Use Your Information
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  Your personal information may be used to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li>Process registrations, payments, and program access</li>
                  <li>Deliver training, LMS content, AI-enabled learning tools, and certification support</li>
                  <li>Provide customer support and resolve queries</li>
                  <li>Communicate updates, schedules, notifications, and administrative messages</li>
                  <li>Improve our website, AI systems, LMS performance, and overall user experience</li>
                  <li>Send promotional content, newsletters, and offers (only if you opt-in)</li>
                  <li>Maintain internal records, analytics, and compliance logs</li>
                  <li>Fulfill our legal, regulatory, or accreditation obligations</li>
                </ul>
              </div>

              {/* Information Sharing and Disclosure Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  3. Information Sharing and Disclosure
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  We do not sell your personal information.
                </p>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  We may share your information only with:
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                      a. Accrediting and Certification Partners
                    </h3>
                    <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                      Such as PMI, PeopleCert, Scrum Alliance, IIBA, AXELOS, EXIN, and other bodies that issue your certificates.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                      b. Service Providers
                    </h3>
                    <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-2 ml-4">
                      Who assist us in:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-8">
                      <li>Payment processing</li>
                      <li>LMS hosting and cloud services</li>
                      <li>Trainers, instructors, exam proctors</li>
                      <li>Email, CRM, or communication platforms</li>
                      <li>AI learning tool providers</li>
                    </ul>
                    <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mt-4 ml-4">
                      All service providers operate under confidentiality and data protection obligations.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                      c. Legal or Regulatory Authorities
                    </h3>
                    <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-2 ml-4">
                      When required by:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-8">
                      <li>Applicable laws (U.S., India, or other jurisdictions)</li>
                      <li>Court orders</li>
                      <li>Government or accreditation audits</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Data Retention Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  4. Data Retention
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  We retain your information only for as long as necessary for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li>Providing services and program access</li>
                  <li>Issuing and verifying certifications</li>
                  <li>Accounting, taxation, and legal compliance</li>
                  <li>LMS historical learning records</li>
                  <li>Internal analytics and audit requirements</li>
                </ul>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mt-6">
                  When data is no longer needed, we securely archive or delete it in accordance with applicable laws.
                </p>
              </div>

              {/* Cookies and Tracking Technologies Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  5. Cookies and Tracking Technologies
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li>Improve site functionality</li>
                  <li>Enhance user experience</li>
                  <li>Analyze traffic and usage patterns</li>
                  <li>Personalize content</li>
                </ul>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mt-6">
                  You may disable cookies through your browser settings, although some features may not function properly.
                </p>
              </div>

              {/* Your Rights Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  6. Your Rights
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  Depending on your jurisdiction (India DPDP Act, U.S. CCPA/CPRA, GDPR for EU residents), you may have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li>Access your personal information</li>
                  <li>Correct or update inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent for optional communications</li>
                  <li>Object to certain processing activities</li>
                  <li>Request data portability</li>
                  <li>Know how your data is used and shared</li>
                </ul>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mt-6">
                  To exercise your rights, contact us using the details in Section 9.
                </p>
              </div>

              {/* Data Security Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  7. Data Security
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  We use appropriate technical and organizational measures to protect your data, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li>Encryption and secure servers</li>
                  <li>Access controls</li>
                  <li>Regular audits</li>
                  <li>Limited data access to authorized personnel</li>
                </ul>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mt-6">
                  No online platform is 100% secure, but we take reasonable measures to minimize risks.
                </p>
              </div>

              {/* International Data Transfers Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  8. International Data Transfers
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  Acesynergi Solutions operates globally, primarily in India and the United States. Your data may be stored or processed:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li>In India</li>
                  <li>In the U.S.</li>
                  <li>By trusted international service partners</li>
                </ul>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mt-6">
                  By using our services, you consent to such transfers in compliance with applicable data protection laws.
                </p>
              </div>

              {/* Contact Us Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  9. Contact Us
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  For any concerns, privacy requests, or questions regarding this policy:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 ml-4">
                  <p className="text-base md:text-lg font-semibold text-foreground mb-2">
                    Acesynergi Solutions
                  </p>
                  <p className="text-base md:text-lg text-foreground">
                    Email:{" "}
                    <a
                      href="mailto:reachus@acesynergi.com"
                      className="text-primary hover:text-accent transition-colors underline font-medium"
                    >
                      reachus@acesynergi.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Changes to This Privacy Policy Section */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  10. Changes to This Privacy Policy
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  We may update this Privacy Policy periodically.
                </p>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  Changes will be posted on this page with a revised "Effective Date."
                </p>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify">
                  Your continued use of our services constitutes acceptance of the updated policy.
                </p>
              </div>

              {/* Last Updated */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-muted-foreground italic text-center">
                  Last Updated: March 7, 2025
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

