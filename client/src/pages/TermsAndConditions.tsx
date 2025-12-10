import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-white py-20 mt-20">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Terms and Conditions
            </h1>
          </div>          
        </div>
      </section>

      {/* Terms and Conditions Content */}
      <section className="flex-1 py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 md:p-12">
              {/* Introduction Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Introduction
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  This is a legal and binding agreement between you, the user (referred to as "user" or "you") of the Programs, as defined below, and Acesynergi Solutions (together with its subsidiaries and international affiliates, hereinafter "Acesynergi Solutions," "us," "we," "our," or "the Company") stating the terms that govern your use of the Platform, as defined below. The website{" "}
                  <a
                    href="https://www.acesynergi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors underline font-medium"
                  >
                    www.acesynergi.com
                  </a>{" "}
                  and mobile apps (collectively referred to as the "Platform") and the information, services, and other materials contained therein are provided and operated by Acesynergi Solutions. Acesynergi Solutions offers curated and specially designed online certification programs, corporate training programs, AI-enabled learning tools, study materials, career assistance services, and consulting services ("Programs").
                </p>
              </div>

              {/* Acceptance of Terms Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Acceptance of Terms
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  Please review our Terms of Use, Privacy Policy, and other policies available on the Platform (collectively referred to as the "Terms") that govern your use of the Platform and Programs. By accepting these Terms in any manner or accessing the Platform, you consent, agree, and undertake to abide by and be bound by these Terms. If you do not agree with these Terms, you are not entitled to use the Programs, and any continued access shall be considered unauthorized.
                </p>
              </div>

              {/* Program-Specific Terms Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Program-Specific Terms
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  Each Program may have a separate set of terms dealing with refunds, deferrals, payments, or other conditions governing those Programs. Our enterprise or corporate clients may also have separate written agreements with us which, in the event of a conflict, will supersede these Terms to the extent of the inconsistency.
                </p>
              </div>

              {/* Platform Scope Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Platform Scope
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  These Terms apply to all Acesynergi Solutions hosted mobile apps, WhatsApp groups, Facebook groups, Instagram pages, LinkedIn pages, email/SMS/phone communications, and any other social media forums operated by Acesynergi Solutions, all of which shall be deemed part of the "Platform." You acknowledge that certain parts of the Platform are provided or supported by third-party service providers, and you agree to comply with their terms and conditions as well. Acesynergi Solutions is not responsible for service disruptions caused by third-party providers.
                </p>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  Although you may "bookmark" a particular section of the Platform, your use of any part of the Platform still binds you to these Terms.
                </p>
              </div>

              {/* Modifications to Terms Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Modifications to Terms
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  We may update or modify these Terms at any time without prior notice. You are encouraged to review this page regularly. Your continued use of the Platform or Programs after any changes indicates that you have read and accepted those changes. If you do not agree with the updated Terms, you should discontinue using the Platform and Programs.
                </p>
              </div>

              {/* Geographic Restrictions Section */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Geographic Restrictions
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify">
                  Acesynergi Solutions makes no representation that the Platform operates (or is legally permitted to operate) in all geographic regions, or that the content, services, or products offered are appropriate or available for use in all locations. Accessing the Platform from territories where its content or functionality is illegal is strictly prohibited. If you choose to access the Platform from any such location, you do so at your own initiative and risk, and you are solely responsible for complying with all applicable laws.
                </p>
              </div>

              {/* Last Updated */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-muted-foreground italic text-center">
                  Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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

