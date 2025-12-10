import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-white py-20 mt-20">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Disclaimer
            </h1>
          </div>          
        </div>
      </section>

      {/* Disclaimer Content */}
      <section className="flex-1 py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 md:p-12">
              {/* Introduction Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Trademarks and Intellectual Property Disclaimer
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  All project management, IT, and professional certification names, logos, and marks referenced herein are the property of their respective owners.
                </p>
              </div>

              {/* Project Management Institute Section */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  Project Management Institute, Inc. (PMI®)
                </h3>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  PMP®, PMI®, PMBOK®, CAPM®, PgMP®, PfMP®, PMI-ACP®, PMI-PBA®, PMI-RMP®, PMI-SP®, and OPM3® are registered marks of PMI, Inc.
                </p>
              </div>

              {/* AXELOS Limited Section */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  AXELOS Limited
                </h3>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  ITIL®, IT Infrastructure Library®, MSP®, and the Swirl logo™ are trademarks or registered trademarks of AXELOS Limited, used under permission. All rights reserved.
                </p>
              </div>

              {/* Scrum Alliance Section */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  Scrum Alliance®
                </h3>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  Certified ScrumMaster® (CSM) and Certified Scrum Trainer® (CST) are registered trademarks.
                </p>
              </div>

              {/* Scrum.org Section */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  Scrum.org
                </h3>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  Professional Scrum Master® is a registered trademark.
                </p>
              </div>

              {/* APM Group Limited Section */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  APM Group Limited
                </h3>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  APMG-International Finance for Non-Financial Managers and the Swirl Device logo are trademarks.
                </p>
              </div>

              {/* The Open Group Section */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  The Open Group
                </h3>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  The Open Group® and TOGAF® are trademarks.
                </p>
              </div>

              {/* IIBA Section */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  International Institute of Business Analysis (IIBA®)
                </h3>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  IIBA®, the IIBA® logo, BABOK®, Business Analysis Body of Knowledge®, CBAP®, Certified Business Analysis Professional, EEP, and the EEP logo are registered trademarks or trademarks owned by IIBA®.
                </p>
              </div>

              {/* ISACA Section */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  ISACA®
                </h3>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  COBIT® is a trademark, and CISA® is a registered trademark of ISACA® and the IT Governance Institute.
                </p>
              </div>

              {/* (ISC)² Section */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  (ISC)²
                </h3>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  CISSP® is a registered trademark of the International Information Systems Security Certification Consortium.
                </p>
              </div>

              {/* Cisco Systems Section */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  Cisco Systems, Inc.
                </h3>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  CISCO®, CCNA®, and CCNP® are trademarks or registered trademarks of Cisco and certain other countries.
                </p>
              </div>

              {/* General Statement Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  General Statement
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  All rights to these marks are reserved by their respective owners. Use of these marks does not imply any sponsorship, endorsement, or affiliation with the trademark holders.
                </p>
              </div>

              {/* Important Note Section */}
              <div className="mb-6">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                        Important Note
                      </h3>
                      <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify">
                        Ace Energy does not assume any responsibility for changes, updates, or modifications to the trademarks or intellectual property rights of third parties. It is the sole responsibility of the end user to verify and comply with the current status of all trademarks and related rights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

