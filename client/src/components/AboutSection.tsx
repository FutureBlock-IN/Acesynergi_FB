import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import aboutImage from "@assets/stock_images/professional_busines_1c7b0b17.jpg";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Award,
      title: "Expert Instructors",
      description: "Learn from industry-leading professionals",
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with learners worldwide",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Advance your professional journey",
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-24 bg-gradient-to-b from-white to-secondary/30" data-testid="section-about" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT SIDE - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Background decorative shape */}
              <div className="absolute -top-6 -left-6 w-full h-full bg-primary/10 rounded-2xl"></div>
              
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={aboutImage}
                  alt="Professional team collaborating"
                  className="w-full h-auto object-cover"
                  data-testid="img-about"
                />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-6 border-2 border-primary/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">Happy Learners</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                About AceSynergi
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4" data-testid="text-about-title">
                Empowering Learners{" "}
                <span className="text-primary">Worldwide</span>
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-about-description">
              At AceSynergi, we believe education should be accessible to everyone,
              everywhere. Our platform connects you with industry experts and
              cutting-edge courses designed to help you achieve your goals.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're looking to start a new career, advance in your
              current role, or simply explore a passion, we provide the tools,
              resources, and community support you need to succeed.
            </p>

            {/* Feature Cards */}
            <div className="grid gap-4 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="p-4 hover:shadow-lg transition-all hover-elevate border-primary/10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
              {[
                { number: "500+", label: "Expert Courses" },
                { number: "50K+", label: "Active Learners" },
                { number: "95%", label: "Success Rate" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="text-center"
                  data-testid={`stat-${i}`}
                >
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
