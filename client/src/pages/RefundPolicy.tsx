import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Receipt } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-white py-20 mt-20">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Receipt className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Refund Policy
            </h1>
          </div>          
          <p className="text-sm text-white/80 mt-2">Effective Date: January 7, 2025</p>
        </div>
      </section>

      {/* Refund Policy Content */}
      <section className="flex-1 py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 md:p-12">
              {/* Introduction Section */}
              <div className="mb-10">
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  Acesynergi Solutions ("Acesynergi," "we," "our," or "the Company") maintains the following Refund, Reschedule, and Cancellation Policy for all training programs, workshops, e-learning modules, and related services. Enrolling in any Acesynergi course signifies that the participant has read, understood, and agreed to the terms below.
                </p>
              </div>

              {/* General Cancellation & Rescheduling Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  1. General Cancellation & Rescheduling
                </h2>
                <ul className="list-disc list-inside space-y-3 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li>Acesynergi may cancel or reschedule any event or workshop due to insufficient registrations, trainer unavailability, or other unforeseen circumstances.</li>
                  <li>Delegates are strongly advised not to make travel arrangements without confirming the workshop with an authorized Acesynergi representative.</li>
                  <li>If Acesynergi cancels an event, delegates will be accommodated in upcoming batches or provided a full credit for future workshops.</li>
                </ul>
              </div>

              {/* Delegate-Initiated Cancellations Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  2. Delegate-Initiated Cancellations (Classroom & Live Virtual Programs)
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                      Cancellation 48+ hours before the event:
                    </h3>
                    <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                      35% of the total paid fee will be deducted; the remainder will be refunded.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                      Cancellation after 48 hours OR after attending 30 minutes of training:
                    </h3>
                    <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                      No refund will be provided.
                    </p>
                  </div>
                  <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mt-4">
                    All cancellation or reschedule requests must be submitted via email only.
                  </p>
                </div>
              </div>

              {/* Attendance & Schedule Requirements Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  3. Attendance & Schedule Requirements
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  Delegates must attend sessions on the confirmed dates.
                </p>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  Acesynergi does not permit:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li>Repetition of sessions</li>
                  <li>Changing batches once the course begins</li>
                  <li>Switching to other schedules after training has started</li>
                </ul>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mt-6">
                  Refunds or schedule changes will not be considered during training.
                </p>
              </div>

              {/* Instructor Substitution & Session Management Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  4. Instructor Substitution & Session Management
                </h2>
                <ul className="list-disc list-inside space-y-3 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li>Acesynergi may replace the instructor anytime due to operational or unforeseen conditions.</li>
                  <li>If an instructor misses a session, a make-up session will be arranged.</li>
                  <li>Refund requests will not be entertained due to instructor substitution or rescheduled sessions.</li>
                </ul>
              </div>

              {/* Participant Responsibilities Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  5. Participant Responsibilities (Virtual Training)
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  Delegates must ensure they have:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li>A stable internet connection</li>
                  <li>Working microphone, speakers, and technical setup</li>
                </ul>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mt-6">
                  Poor audio/video caused by participant-side technical issues does not qualify for refunds or rescheduling.
                </p>
              </div>

              {/* Examination & Certification Disclaimer Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  6. Examination & Certification Disclaimer
                </h2>
                <ul className="list-disc list-inside space-y-3 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li>As an Endorsed Education Provider for certain programs, Acesynergi provides guidance and support for certification preparation.</li>
                  <li>Participants must put in the required effort; Acesynergi is not responsible for exam results.</li>
                  <li>Completion of training does not guarantee passing any certification exam.</li>
                </ul>
              </div>

              {/* Liability Limitation Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  7. Liability Limitation
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify">
                  Acesynergi is not liable for any direct, indirect, consequential, or special damages arising from training cancellations, including costs related to travel, accommodation, or logistics.
                </p>
              </div>

              {/* E-Learning Refund Policy Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  8. E-Learning (Self-Paced Training) Refund Policy
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  This applies to all paid self-paced or LMS-based programs.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                      8.1 Cancellations by Delegate
                    </h3>
                    <div className="space-y-4 ml-4">
                      <div>
                        <h4 className="text-lg md:text-xl font-medium text-foreground mb-2">
                          Within 48 hours AND before completing 30 minutes of content:
                        </h4>
                        <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                          <li>Full refund minus 10% (bank/payment gateway charges).</li>
                          <li>OR free transfer to another online course.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-medium text-foreground mb-2">
                          After 48 hours OR after consuming more than 30 minutes of content:
                        </h4>
                        <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                          No refund.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                      8.2 Extensions
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                      <li>One extension of up to 1 month may be granted if requested before course expiry.</li>
                      <li>Additional extensions require payment of 50% of the course fee.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                      8.3 Refund Processing
                    </h3>
                    <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                      Refunds may incur banking/payment gateway charges up to 10%.
                    </p>
                  </div>
                </div>
              </div>

              {/* Acknowledgment Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  9. Acknowledgment
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  Enrolling in any Acesynergi program is deemed an acknowledgment that the participant has:
                </p>
                <ul className="list-none space-y-2 text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify ml-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">✔</span>
                    <span>Reviewed this Refund & Cancellation Policy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">✔</span>
                    <span>Accepted the terms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">✔</span>
                    <span>Understood all refund/transfer conditions</span>
                  </li>
                </ul>
              </div>

              {/* Policy Modifications Section */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  10. Policy Modifications
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-4">
                  Acesynergi Solutions reserves the right to modify, update, revise, or replace this Refund & Cancellation Policy at any time, without prior notice. All such changes will be effective immediately upon posting on our official website or communication channels. The provisions stated herein serve as general product and service guidelines; however, specific terms, processes, or conditions may change based on business requirements, regulatory updates, accreditation rules, or operational considerations.
                </p>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify">
                  Continued use of Acesynergi services after any such modification constitutes acceptance of the updated policy.
                </p>
              </div>

              {/* Last Updated */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-muted-foreground italic text-center">
                  Last Updated: January 7, 2025
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

