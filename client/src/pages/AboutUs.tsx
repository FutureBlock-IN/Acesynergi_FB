import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-white py-20 mt-20">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">
              About Us
            </h1>
          </div>
         
        </div>
      </section>

      {/* About Us Content */}
      <section className="flex-1 py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 md:p-12">
              {/* Introduction Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  About Us – Acesynergi Solutions
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify mb-6">
                  Acesynergi Solutions is a global leader in reliability engineering software, education, consulting, and related services. We specialize in delivering innovative, high-quality, and cost-effective solutions to clients across industries such as Insurance, Finance, Healthcare, and Aerospace. Our approach combines deep domain expertise with cutting-edge technology to help organizations optimize performance, enhance reliability, and achieve sustainable growth.
                </p>
              </div>

              {/* Vision Section */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Vision
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify">
                  Our vision is to be recognized globally as a leading organization known for integrity, innovation, teamwork, and exceptional performance. We aim to create meaningful employment opportunities worldwide while fostering a culture of excellence and continuous improvement.
                </p>
              </div>

              {/* Mission Section */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20">
                  Mission
                </h2>
                <p className="text-base md:text-lg text-foreground leading-7 md:leading-8 text-justify">
                  Our mission is to grow as a trusted brand in the IT sector by delivering top-quality services that create win-win outcomes for our clients and stakeholders. Acesynergi Solutions is committed to helping businesses become more efficient, sustainable, and profitable—today and into the future—through innovative solutions, reliable expertise, and a customer-centric approach.
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

