import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Davina Sandifer Ph.D., SMC, ECBA",
    course: "Business Analyst Certification",
    company: "",
    rating: 5,
    image: "https://www.acesynergi.com/US/images/default-user.jpg",
    text: "Acesynergi Solutions provides a dynamic training program for professionals seeking a Business Analyst Certification. The facilitation and learning flows at a steady pace, allowing participants to immediately develop practical experience through simulations and role plays. The curriculum follows BABOK, ensuring that participants are adequately prepared to successfully complete the certification exam on the first try. I especially endorse Sairam Bingi as facilitator and coach. His 20+ years of experience and qualifications provide specialized insight for professionals new to IT and Business Analyst roles. I highly recommend Acesynergi Solutions, as it provides high value and high impact for organizations and professionals.",
  },
  {
    id: 2,
    name: "Supriya Rebello",
    course: "ECBA Certification",
    company: "",
    rating: 5,
    image: "https://www.acesynergi.com/US/images/image.jpg",
    text: "A good doctor is a doctor who can do the right diagnosis & identify the right problem. I had been planning to get ECBA certification for a while but was uncertain which direction I should approach to study and get certified. My trainer did the right diagnosis, and the pattern of the program is so well articulated that I was able to pass my ECBA certification on the very first attempt, even with my busy work schedule. The program is well articulated and very detail-oriented. The study material provided is very helpful. The trainer is like a mentor who keeps guiding you in every step of the course and tracks your progress during the preparation for the exam. I highly recommend Acesynergi to everyone who plans to get certified not only in ECBA but other professional certifications too.",
  },
  {
    id: 3,
    name: "Sara Tleis, Business System Analyst",
    course: "ECBA®, SMC™",
    company: "",
    rating: 5,
    image: "https://www.acesynergi.com/US/images/default-user.jpg",
    text: "Acesynergi Solutions provided me with all the information I needed to pass my ECBA certification. The highly qualified trainer and supporting materials made preparing for the ECBA certification much smoother than what I had anticipated. I highly recommend Acesynergi for any Business Analysis training.",
  },
  {
    id: 4,
    name: "Prince Samuel",
    course: "ECBA™, SMC™",
    company: "Computer Hardware & Desktop Support Engineer | IT Business Systems Analyst",
    rating: 5,
    image: "https://www.acesynergi.com/US/images/image1.jpg",
    text: "Acesynergi Solutions specializes in introducing professionals to the world of Business Analyst. The trainer is an industry expert in the world of Business Analysis. The trainer created an environment that helped me to have a good feel as to what it looks like to work as a business analyst. The program played a vital role in preparing me for the ECBA Certification exam. The prep materials such as the practice questions helped me to pass my ECBA certification in my first attempt. I would highly recommend the program for any professional seeking to become a business analyst.",
  },
  {
    id: 5,
    name: "Kenny Zhang",
    course: "Business System Analyst",
    company: "Business System Analyst at Revature",
    rating: 5,
    image: "https://www.acesynergi.com/US/images/image4.jpg",
    text: "Acesynergi Solutions helped me understand the fundamentals and key material to successfully secure the ECBA Certification, an essential milestone in my career as a Business System Analyst. The certification contains an extensive amount of information and requires extensive amount of preparation. The prep resources, practice tests and constant support from Acesynergy Solutions helped me to successfully pass the ECBA certification in my first attempt. Acesynergy was a key component in completing the ECBA certification. I recommend Acesynergy solution for this certification!",
  },
  {
    id: 6,
    name: "Mike Amazan",
    course: "Business Systems Analyst",
    company: "Business Systems Analyst at Revature; Entry Certificate in Business Analysis™ (ECBA®) | Scrum Master Certified (SMC™)",
    rating: 5,
    image: "https://www.acesynergi.com/US/images/image5.jpg",
    text: "Acesynergi Solutions is a great company that really helped me in learning about the world of business analysis, what it takes to be a Business Systems Analysts, and what I need to obtain my ECBA certification and SCRUM certification. I would recommend it to anyone who wants to grow as a person and is interested of being part of the Business Systems Analyst field. From interactive lessons and exercises, to practice test based on the BABOK chapters Acesynergi really helped to boost my confidence for taking my certification test and help me to feel ready to be a Business Systems Analyst in the real world.",
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
            What Our Customers are Saying
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
                        {testimonial.company && (
                          <div className="text-sm text-gray-500">{testimonial.company}</div>
                        )}
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
