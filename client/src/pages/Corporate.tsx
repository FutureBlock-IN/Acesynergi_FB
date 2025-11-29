import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle } from "lucide-react";
import corporateBg from "@assets/stock_images/professional_busines_10dc0c76.jpg";

export default function Corporate() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/corporate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Request Submitted Successfully!",
          description: "Thank you! Our team will reach out within 24 hours. A confirmation email has been sent to your inbox.",
        });
        setFormData({ name: "", email: "", phone: "", comment: "" });
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative bg-[#1a1a1a] text-white py-20 mt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={corporateBg}
            alt="Corporate Training"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-corporate-hero-title">
            CORPORATE TRAINING
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-16 bg-background" data-testid="section-corporate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            {/* Left Side - Content */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                AceSynergi
              </h2>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  AceSynergi's mission is to enable world-class companies to increase productivity and performance through their people. Our In-Company training solution is all about your organization - we can work with you to identify your individual and company-wide training needs to deliver a course that meets your needs.
                </p>
                
                <p>
                  We welcome enquiries from corporate clients of any size. We can deliver our courses at your facility or, if you prefer, at a specific offsite facility. Each of the courses offered by AceSynergi can be delivered as a standard course, or can be tailored to suit your specific needs.
                </p>
                
                <p>
                  Our corporate training department guides the organizations to an integrated solution of the highest quality for their training needs. AceSynergi's academic team is made up of professionals who along with great management career also have had extensive experience in such specific tasks.
                </p>
                
                <p>
                  AceSynergi's corporate training helps your organization build the right skill levels amongst your workforce to support your various IT projects. Our training programs cover a range of domains to take care of your organization's total training requirements.
                </p>
                
                <p>
                  Our Training professionals specialize in assessing training needs, designing, developing, delivering, administering and evaluating training programs.
                </p>
              </div>
            </div>

            {/* Right Side - Apply Now Form */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="p-6 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.1)] border-none">
                <h3 className="text-xl font-bold mb-6 text-primary">
                  Apply Now
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12 bg-muted border-[#E5E7EB]"
                    data-testid="input-corporate-name"
                  />
                  
                  <Input
                    type="email"
                    placeholder="Your E-mail ID"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 bg-muted border-[#E5E7EB]"
                    data-testid="input-corporate-email"
                  />
                  
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12 bg-muted border-[#E5E7EB]"
                    data-testid="input-corporate-phone"
                  />
                  
                  <Textarea
                    placeholder="Comment"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="min-h-[120px] bg-muted resize-none border-[#E5E7EB]"
                    data-testid="input-corporate-comment"
                  />
                  
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white h-12"
                    data-testid="button-send-profile"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Profile →"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
