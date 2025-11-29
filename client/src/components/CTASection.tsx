import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ctaImage from "@assets/generated_images/CTA_background_graduates_celebrating_e0454a9e.png";

export default function CTASection() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden" data-testid="section-cta">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${ctaImage})`,
          backgroundAttachment: "fixed",
        }}
      />
      
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          data-testid="text-cta-title"
        >
          Ready to Transform Your Future?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
        >
          Join thousands of successful learners and start your journey today.
          Your dream career is just one click away.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-chart-3 to-chart-4 hover:from-chart-3/90 hover:to-chart-4/90 text-white text-xl px-12 h-14 animate-pulse-glow"
            data-testid="button-ready-to-start"
            onClick={() => console.log("Ready to Start clicked")}
          >
            Ready to Start
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
