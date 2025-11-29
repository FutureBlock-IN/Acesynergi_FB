import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import testimonial1 from "@assets/generated_images/Student_testimonial_portrait_female_0f7257f2.png";
import testimonial2 from "@assets/generated_images/Student_testimonial_portrait_male_7cdd02e5.png";
import testimonial3 from "@assets/generated_images/Professional_testimonial_portrait_female_df9be6b6.png";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    course: "PMP Certification Training",
    company: "Senior Project Manager, Tech Corp",
    rating: 5,
    image: testimonial1,
    text: "This course completely transformed my career! The instructors are incredibly knowledgeable and supportive. I landed my dream job as a frontend developer just 2 months after completing the bootcamp.",
  },
  {
    id: 2,
    name: "Michael Chen",
    course: "Agile Scrum Master Training",
    company: "Scrum Master, Innovation Labs",
    rating: 5,
    image: testimonial2,
    text: "The curriculum is well-structured and covers everything you need to become a data scientist. The hands-on projects gave me the confidence to apply these skills in real-world scenarios.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    course: "PRINCE2 Certification",
    company: "Program Director, Global Solutions",
    rating: 5,
    image: testimonial3,
    text: "Outstanding course! I've doubled my client base since applying the strategies I learned. The instructors provide practical, actionable advice that delivers real results.",
  },
  {
    id: 4,
    name: "David Kim",
    course: "Lean Six Sigma Green Belt",
    company: "Quality Manager, Manufacturing Inc",
    rating: 5,
    image: testimonial1,
    text: "The training provided exceptional value. The real-world case studies and practical exercises made complex concepts easy to understand and apply immediately.",
  },
  {
    id: 5,
    name: "Priya Sharma",
    course: "PMI-ACP Certification",
    company: "Agile Coach, Digital Ventures",
    rating: 5,
    image: testimonial3,
    text: "Best investment in my professional development. The certification opened doors to new opportunities and the instructor's expertise was evident throughout.",
  },
  {
    id: 6,
    name: "James Wilson",
    course: "Lean Six Sigma Black Belt",
    company: "Process Excellence Lead, Fortune 500",
    rating: 5,
    image: testimonial2,
    text: "Comprehensive program with excellent support. The knowledge I gained has been instrumental in driving process improvements at my organization.",
  },
];

export default function TestimonialsCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const itemsPerPage = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };
  
  const totalPages = Math.ceil(testimonials.length / itemsPerPage.desktop);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isPaused, totalPages]);

  const goToNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * itemsPerPage.desktop;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + itemsPerPage.desktop);

  return (
    <section 
      className="py-20 md:py-24 bg-[#F8FAFC]" 
      data-testid="section-testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-4" data-testid="text-testimonials-title">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600">
            Real stories from learners who transformed their careers
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${currentPage}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="p-8 bg-white border-none rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col" 
                    data-testid={`card-testimonial-${testimonial.id}`}
                  >
                    <Quote className="w-12 h-12 text-secondary mb-6" />
                    
                    <p className="text-lg text-gray-700 italic mb-8 flex-1">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 flex-shrink-0">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="text-lg font-semibold">{testimonial.name[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </div>
                        <div className="font-bold text-lg text-primary">{testimonial.name}</div>
                        <div className="text-sm text-secondary font-medium">{testimonial.course}</div>
                        <div className="text-sm text-gray-500">{testimonial.company}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex bg-secondary text-white hover:bg-secondary/90 hover:text-white w-12 h-12 rounded-full shadow-lg"
            onClick={goToPrev}
            data-testid="button-testimonial-prev"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:flex bg-secondary text-white hover:bg-secondary/90 hover:text-white w-12 h-12 rounded-full shadow-lg"
            onClick={goToNext}
            data-testid="button-testimonial-next"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentPage ? "bg-secondary w-8" : "bg-secondary/30 w-2"
                }`}
                onClick={() => setCurrentPage(index)}
                data-testid={`button-testimonial-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
