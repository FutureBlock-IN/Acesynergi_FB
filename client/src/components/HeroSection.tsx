import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GraduationCap, Globe, Sparkles } from "lucide-react";
import heroImage from "@assets/stock_images/professional_student_a084dda4.jpg";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1E40AF 0%, #06B6D4 100%)'
      }}
      data-testid="section-hero"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-24 left-12 text-white/20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <GraduationCap className="w-12 h-12" />
      </motion.div>

      <motion.div
        className="absolute top-32 right-1/4 text-white/20"
        animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Globe className="w-10 h-10" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-1/3 text-white/20"
        animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 w-full relative z-10">
  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
    {/* LEFT SIDE - Content */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white"
          data-testid="text-hero-title"
        >
          Your Learning Journey Starts Here
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-base sm:text-lg text-white/90 leading-relaxed"
        data-testid="text-hero-description"
      >
        Our extensive portfolio of courses will enable you to have all the
        skills you need to succeed.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 pt-4 w-full"
      >
        <Link href="/contact" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 h-11 sm:h-12 md:h-13 shadow-lg font-semibold w-full"
            data-testid="button-talk-to-us"
          >
            Talk to Us Now →
          </Button>
        </Link>
        
        <Button
          size="lg"
          variant="outline"
          className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 h-11 sm:h-12 md:h-13 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-semibold w-full sm:w-auto"
          data-testid="button-find-course"
          onClick={() => {
            console.log("Find The Course clicked");
            document
              .getElementById("courses")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Find Your Course →
        </Button>
      </motion.div>
    </motion.div>

    {/* RIGHT SIDE - Circular Professional Photo */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative flex justify-center items-center lg:order-2 order-first"
    >
      {/* Decorative Circle Background */}
      <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-secondary/20 to-white/10 rounded-full blur-3xl"></div>

      {/* Main Circular Image */}
      <div className="relative w-[250px] h-[250px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden shadow-2xl ring-4 sm:ring-8 ring-white/20 border-2 sm:border-4 border-white/30">
        <img
          src={heroImage}
          alt="Students learning together in a professional environment"
          className="w-full h-full object-cover"
          data-testid="img-hero"
        />
      </div>

      {/* Decorative floating card - Workshop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute -bottom-2 sm:-bottom-4 left-2 sm:left-4 bg-white rounded-xl shadow-2xl p-3 sm:p-4 max-w-[200px] sm:max-w-[240px]"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent flex items-center justify-center">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-xs sm:text-sm text-foreground">
              Latest Workshop
            </p>
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90 text-white mt-1 h-7 sm:h-8 text-xs font-semibold"
            >
              Join Now →
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
</div>
    </section>
  );
}
