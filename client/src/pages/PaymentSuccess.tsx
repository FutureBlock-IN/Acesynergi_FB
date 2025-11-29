import { motion } from "framer-motion";
import { CheckCircle, Home, BookOpen, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-12 md:py-16 mt-16 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle className="w-20 h-20 mx-auto mb-4 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            data-testid="text-success-title"
          >
            Payment Successful!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg text-white/90"
          >
            Thank you for your purchase
          </motion.p>
        </div>
      </section>

      <section className="flex-1 py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-8 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.1)] border-none text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Your Enrollment is Confirmed!
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                We've received your payment and you're now enrolled in your selected courses. 
                A confirmation email with course access details will be sent to your registered email address shortly.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">What's Next?</h3>
                <ul className="text-left text-gray-600 space-y-3">
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Check your email for course access credentials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Access your learning materials and start your training</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Complete your certification and advance your career</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8"
                    data-testid="button-go-home"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Go to Home
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button 
                    variant="outline"
                    className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 px-8"
                    data-testid="button-browse-more"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse More Courses
                  </Button>
                </Link>
              </div>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Need help? Contact us at{" "}
                <a href="mailto:emmanuel012k@gmail.com" className="text-primary hover:underline">
                  emmanuel012k@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
