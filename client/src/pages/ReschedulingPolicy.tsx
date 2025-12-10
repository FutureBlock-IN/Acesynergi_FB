import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function ReschedulingPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-white py-20 mt-20">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Rescheduling Policy
            </h1>
          </div>          
        </div>
      </section>

      {/* Rescheduling Policy Content */}
      <section className="flex-1 py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 md:p-12">
              {/* Introduction Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Delegate-Initiated Cancellations and Rescheduling (Classroom & Live Virtual Programs)
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  General Guidelines
                </h3>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  All options, fees, and timelines described in this policy are general guidelines intended to provide a standard framework for delegates. Delegates are advised to carefully review the scheduled dates and plan accordingly.
                </p>
              </div>

              {/* Cancellation by Delegate Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Cancellation by Delegate
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                      48+ hours before the event:
                    </h3>
                    <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                      35% of the total paid fee will be deducted; the remainder will be refunded.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                      After 48 hours or after attending 30 minutes of training:
                    </h3>
                    <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                      No refund will be provided.
                    </p>
                  </div>
                  <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mt-4">
                    All cancellation requests must be submitted via email only.
                  </p>
                </div>
              </div>

              {/* Rescheduling by Delegate Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Rescheduling by Delegate
                </h2>
                <ul className="list-disc list-inside space-y-3 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li>Delegates may request to reschedule their training only for live virtual or online programs; classroom trainings cannot be rescheduled.</li>
                  <li>If requested 7 days or more before the scheduled training: 20% of the registration fee will be charged as a rescheduling fee.</li>
                  <li>If requested within 7 days of the scheduled training: Rescheduling is not allowed, but the delegate may send a replacement participant.</li>
                  <li>Replacement delegates must be communicated to Acesynergi at least 3 days prior to the event.</li>
                  <li>If the rescheduled dates do not fit the delegate's schedule, a 100% refund will be provided, and the delegate will not be offered an alternative rescheduled training option.</li>
                  <li>Delegates may attend rescheduled sessions at any future date, location, or batch as per Acesynergi's schedule, provided the rescheduled dates are acceptable to the delegate.</li>
                  <li>All requests for replacements or rescheduling must be made via email and are subject to confirmation by Acesynergi.</li>
                </ul>
              </div>

              {/* Policy Guidelines Section */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Policy Guidelines and Case-by-Case Discretion
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify">
                  Acesynergi Solutions reserves the right to modify, waive, or customize these policies on a case-by-case basis at its sole discretion, and the final determination regarding refunds, cancellations, rescheduling, or any exceptions shall be final, legally binding, and at the sole discretion of Acesynergi Solutions.
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

