import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const categories = [
  {
    id: 1,
    name: "Business Analysis",
    description: "CBAP, ECBA, CCBA Certifications",
    href: "/courses/cbap",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Gen AI Courses",
    description: "AI-Powered Professional Skills",
    href: "/courses/genai-scrum-master",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Agile & Scrum",
    description: "Scrum Master, Product Owner",
    href: "/courses",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Project Management",
    description: "PMP Certification Training",
    href: "/courses/pmp",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Cyber Security",
    description: "Security Certifications & Training",
    href: "/courses",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 6,
    name: "DevOps",
    description: "CI/CD & Cloud Infrastructure",
    href: "/courses",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 7,
    name: "IT Service Management",
    description: "ITIL & Service Excellence",
    href: "/courses",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 8,
    name: "Quality Management",
    description: "Six Sigma & Quality Assurance",
    href: "/courses",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop&q=80",
  },
];

export default function CategoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const categoriesPerPage = 4;
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getVisibleCategories = () => {
    const start = currentIndex * categoriesPerPage;
    return categories.slice(start, start + categoriesPerPage);
  };

  return (
    <section className="py-20 md:py-24 bg-gray-50" data-testid="section-categories">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900" data-testid="text-categories-title">
            Favorite Topics to Learn
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our most popular certification categories and advance your career
          </p>
        </motion.div>

        <div className="relative">
          <Button
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hidden md:flex"
            onClick={goToPrev}
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hidden md:flex"
            onClick={goToNext}
            data-testid="button-carousel-next"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {getVisibleCategories().map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>

          <div className="lg:hidden relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {getVisibleCategories().slice(0, 2).map((category, index) => (
                  <CategoryCard key={category.id} category={category} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              <Button
                size="icon"
                className="bg-primary hover:bg-primary/90 text-white shadow-lg"
                onClick={goToPrev}
              >
                <ChevronLeft />
              </Button>

              <Button
                size="icon"
                className="bg-primary hover:bg-primary/90 text-white shadow-lg"
                onClick={goToNext}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary w-8" : "bg-gray-300 w-2"
                }`}
                onClick={() => setCurrentIndex(index)}
                data-testid={`button-carousel-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  return (
    <Link href={category.href}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative h-72 rounded-xl overflow-hidden cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-300"
        data-testid={`card-category-${category.id}`}
      >
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="relative h-full p-6 flex flex-col justify-end text-white">
          <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
          <p className="text-white/80 text-sm">{category.description}</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </motion.div>
    </Link>
  );
}
