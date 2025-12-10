import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, CheckCircle, XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for contacting us! We'll get back to you soon. A confirmation email has been sent to your inbox.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
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
      <section className="relative bg-gradient-to-r from-primary to-accent text-white py-20 mt-20">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            data-testid="text-contact-hero-title"
          >
            CONTACT
          </h1>
          <p className="text-lg text-white/90">Home / Contact</p>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="flex-1 py-20 bg-background"
        data-testid="section-contact"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
                  Contact With Us ››››
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  Feel Free to Write us Anytime
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="h-12 bg-card border-primary/20 focus:border-primary"
                    data-testid="input-name"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="h-12 bg-card border-primary/20 focus:border-primary"
                    data-testid="input-email"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="h-12 bg-card border-primary/20 focus:border-primary"
                    data-testid="input-phone"
                  />
                  <Input
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="h-12 bg-card border-primary/20 focus:border-primary"
                    data-testid="input-subject"
                  />
                </div>

                <Textarea
                  placeholder="Write a Message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="bg-card resize-none border-primary/20 focus:border-primary"
                  data-testid="textarea-message"
                />

                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-accent text-white px-12"
                  data-testid="button-send-message"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send a Message →"}
                </Button>
              </form>
            </motion.div>

            {/* Right Side - Reach Us */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
                Reach Us
              </h2>

              <div className="space-y-6">
                {/* AceSynergi Pvt Ltd */}
                <Card className="p-8 bg-card border-primary/10 shadow-md">
                  <h3 className="text-xl font-bold mb-6 pb-4 border-b border-primary/20 text-foreground">
                    Acesynergi Solutions
                  </h3>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground mb-2">
                          Address
                        </div>
                        <div className="text-sm text-muted-foreground leading-relaxed">
                          Vasavi Towers 5th Floor, West Marredpally,
                          <br />
                          Hyderabad - 500 026, Telangana.
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground mb-2">
                          Email Id
                        </div>
                        <a
                          href="mailto:support@learnersink.com"
                          className="text-sm text-primary hover:text-accent transition-colors"
                        >
                          reachus@acesynergi.com
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground mb-2">
                          Phone
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {/* <div className="flex justify-between">
                            <span className="font-medium">USA:</span>
                            <a
                              href="tel:+14084447579"
                              className="text-primary hover:text-accent transition-colors"
                            >
                              +1-408-444-7579
                            </a>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">UK:</span>
                            <a
                              href="tel:+442033800689"
                              className="text-primary hover:text-accent transition-colors"
                            >
                              +91-40-42036080
                            </a>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Australia:</span>
                            <a
                              href="tel:+61741869762"
                              className="text-primary hover:text-accent transition-colors"
                            >
                              +91-40-42036080
                            </a>
                          </div> */}
                          <div className="flex justify-between">
                            <span className="font-medium">India:</span>
                            <a
                              href="tel:+919775864186"
                              className="text-primary hover:text-accent transition-colors"
                            >
                              +91-40-42036080
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-secondary/30 border-primary/20 shadow-sm">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">
                      Welcome to our site!
                    </span>{" "}
                    If you need help, simply reply to this message. We are
                    online and ready to help.
                  </p>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
