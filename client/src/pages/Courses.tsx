import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useCurrency } from "@/lib/currencyContext";
import { useCoursePricing } from "@/hooks/useCoursePricing";

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  price: number;
  originalPrice: number;
  badge?: string;
}

interface CourseCategory {
  name: string;
  description: string;
  courses: Course[];
}

const courseCategories: CourseCategory[] = [
  {
    name: "Project Management",
    description: "Master project management methodologies and earn globally recognized certifications",
    courses: [
      {
        id: "pmp",
        title: "PMP Certification Training",
        description: "PMI's Project Management Professional certification for experienced project managers",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&q=80",
        duration: "36 hours",
        level: "Advanced",
        rating: 4.9,
        students: 12450,
        price: 999,
        originalPrice: 1499,
        badge: "Best Seller",
      },
      {
        id: "pmipba",
        title: "PMI PBA Certification Training",
        description: "Structured project management methodology for controlled project delivery",
        image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600&h=400&fit=crop&q=80",
        duration: "24 hours",
        level: "Beginner",
        rating: 4.7,
        students: 5430,
        price: 749,
        originalPrice: 1099,
        badge: "Popular",
      },
      {
        id: "pmi-acp",
        title: "PMI-ACP® Certification Training",
        description: "PMI Agile Certified Practitioner certification for agile project management professionals",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
        duration: "21 hours",
        level: "Intermediate",
        rating: 4.8,
        students: 7230,
        price: 899,
        originalPrice: 1299,
        badge: "Popular",
      },
      {
        id: "capm",
        title: "CAPM® Certification Training",
        description: "Certified Associate in Project Management entry-level certification for project practitioners",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&q=80",
        duration: "23 hours",
        level: "Beginner",
        rating: 4.7,
        students: 5670,
        price: 699,
        originalPrice: 999,
        badge: "New",
      },
    ]
  },
  {
    name: "Business Management",
    description: "Develop business analysis skills with IIBA-certified training programs",
    courses: [
      {
        id: "cbap",
        title: "CBAP Certification Training",
        description: "Certified Business Analysis Professional for senior business analysts",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80",
        duration: "35 hours",
        level: "Advanced",
        rating: 4.9,
        students: 8920,
        price: 999,
        originalPrice: 1499,
        badge: "Best Seller",
      },
      {
        id: "ecba",
        title: "ECBA Certification Training",
        description: "Entry Certificate in Business Analysis for aspiring business analysts",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80",
        duration: "21 hours",
        level: "Beginner",
        rating: 4.8,
        students: 6540,
        price: 699,
        originalPrice: 999,
        badge: "Popular",
      },
      {
        id: "ccba",
        title: "CCBA Certification Training",
        description: "Certification of Capability in Business Analysis for mid-level professionals",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=400&fit=crop&q=80",
        duration: "28 hours",
        level: "Intermediate",
        rating: 4.8,
        students: 5230,
        price: 849,
        originalPrice: 1299,
      },
    ]
  },
  // {
  //   name: "Agile and Scrum",
  //   description: "Learn agile methodologies and Scrum framework for modern project delivery",
  //   courses: [
  //     {
  //       id: "agile-project-management",
  //       title: "Agile Project Management",
  //       description: "Master agile principles and practices for effective project delivery",
  //       image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
  //       duration: "24 hours",
  //       level: "Intermediate",
  //       rating: 4.8,
  //       students: 7650,
  //       price: 799,
  //       originalPrice: 1199,
  //       badge: "Trending",
  //     },
  //     {
  //       id: "csm",
  //       title: "Certified Scrum Master",
  //       description: "Official Scrum Alliance certification for Scrum Masters",
  //       image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80",
  //       duration: "16 hours",
  //       level: "Beginner",
  //       rating: 4.9,
  //       students: 9870,
  //       price: 899,
  //       originalPrice: 1299,
  //       badge: "Best Seller",
  //     },
  //     {
  //       id: "cspo",
  //       title: "Certified Scrum Product Owner",
  //       description: "Learn product ownership skills with Scrum Alliance certification",
  //       image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&q=80",
  //       duration: "16 hours",
  //       level: "Intermediate",
  //       rating: 4.8,
  //       students: 6540,
  //       price: 899,
  //       originalPrice: 1299,
  //       badge: "Popular",
  //     },
  //   ]
  // },
  // {
  //   name: "Gen AI Courses",
  //   description: "Leverage Generative AI to enhance your professional skills and productivity",
  //   courses: [
  //     {
  //       id: "genai-scrum-master",
  //       title: "Gen AI for Scrum Masters",
  //       description: "AI-powered sprint planning, retrospectives, and team productivity optimization",
  //       image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&q=80",
  //       duration: "16 hours",
  //       level: "Intermediate",
  //       rating: 4.9,
  //       students: 3450,
  //       price: 599,
  //       originalPrice: 899,
  //       badge: "New",
  //     },
  //     {
  //       id: "genai-project-managers",
  //       title: "Gen AI for Project Managers",
  //       description: "Streamline project workflows with AI-powered planning and reporting",
  //       image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&q=80",
  //       duration: "20 hours",
  //       level: "Intermediate",
  //       rating: 4.8,
  //       students: 4870,
  //       price: 699,
  //       originalPrice: 999,
  //       badge: "Trending",
  //     },
  //     {
  //       id: "genai-product-owner",
  //       title: "Gen AI for Product Owners",
  //       description: "AI-assisted backlog management and data-driven product decisions",
  //       image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop&q=80",
  //       duration: "16 hours",
  //       level: "Intermediate",
  //       rating: 4.7,
  //       students: 2890,
  //       price: 599,
  //       originalPrice: 899,
  //     },
  //     {
  //       id: "genai-business-analysts",
  //       title: "Gen AI for Business Analysts",
  //       description: "Transform business analysis with AI-powered requirements gathering",
  //       image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&h=400&fit=crop&q=80",
  //       duration: "16 hours",
  //       level: "Intermediate",
  //       rating: 4.8,
  //       students: 3210,
  //       price: 599,
  //       originalPrice: 899,
  //       badge: "Popular",
  //     },
  //     {
  //       id: "genai-interview-prep",
  //       title: "Interview Prep for Scrum Masters",
  //       description: "AI-powered mock interviews and resume optimization for job seekers",
  //       image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop&q=80",
  //       duration: "8 hours",
  //       level: "Beginner",
  //       rating: 4.6,
  //       students: 1890,
  //       price: 299,
  //       originalPrice: 499,
  //     },
  //   ]
  // },
  // {
  //   name: "Quality Management",
  //   description: "Master quality management frameworks and earn Six Sigma certifications",
  //   courses: [
  //     {
  //       id: "six-sigma-green-belt",
  //       title: "Six Sigma Green Belt",
  //       description: "Learn DMAIC methodology and quality improvement techniques",
  //       image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&q=80",
  //       duration: "32 hours",
  //       level: "Intermediate",
  //       rating: 4.8,
  //       students: 5670,
  //       price: 849,
  //       originalPrice: 1199,
  //       badge: "Popular",
  //     },
  //     {
  //       id: "six-sigma-black-belt",
  //       title: "Six Sigma Black Belt",
  //       description: "Advanced quality management and process improvement leadership",
  //       image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop&q=80",
  //       duration: "48 hours",
  //       level: "Advanced",
  //       rating: 4.9,
  //       students: 3420,
  //       price: 1299,
  //       originalPrice: 1799,
  //       badge: "Best Seller",
  //     },
  //   ]
  // },
  // {
  //   name: "IT Service Management",
  //   description: "Develop IT service management expertise with ITIL certifications",
  //   courses: [
  //     {
  //       id: "itil-foundation",
  //       title: "ITIL 4 Foundation",
  //       description: "Foundational understanding of IT service management best practices",
  //       image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&q=80",
  //       duration: "24 hours",
  //       level: "Beginner",
  //       rating: 4.8,
  //       students: 8920,
  //       price: 699,
  //       originalPrice: 999,
  //       badge: "Best Seller",
  //     },
  //     {
  //       id: "itil-practitioner",
  //       title: "ITIL 4 Managing Professional",
  //       description: "Advanced ITIL practices for IT service management professionals",
  //       image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop&q=80",
  //       duration: "40 hours",
  //       level: "Advanced",
  //       rating: 4.7,
  //       students: 4230,
  //       price: 1199,
  //       originalPrice: 1599,
  //       badge: "Popular",
  //     },
  //   ]
  // },
  // {
  //   name: "DevOps",
  //   description: "Learn DevOps practices and tools for modern software delivery",
  //   courses: [
  //     {
  //       id: "devops-foundation",
  //       title: "DevOps Foundation",
  //       description: "Core DevOps principles, practices, and tools for continuous delivery",
  //       image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop&q=80",
  //       duration: "16 hours",
  //       level: "Beginner",
  //       rating: 4.8,
  //       students: 6780,
  //       price: 599,
  //       originalPrice: 899,
  //       badge: "Trending",
  //     },
  //     {
  //       id: "kubernetes-admin",
  //       title: "Kubernetes Administrator",
  //       description: "Container orchestration and Kubernetes cluster management",
  //       image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop&q=80",
  //       duration: "32 hours",
  //       level: "Advanced",
  //       rating: 4.9,
  //       students: 4560,
  //       price: 999,
  //       originalPrice: 1399,
  //       badge: "Popular",
  //     },
  //   ]
  // },
  // {
  //   name: "Skills Training",
  //   description: "Develop essential professional skills for career advancement",
  //   courses: [
  //     {
  //       id: "leadership-essentials",
  //       title: "Leadership Essentials",
  //       description: "Core leadership skills for emerging and established leaders",
  //       image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&q=80",
  //       duration: "20 hours",
  //       level: "Intermediate",
  //       rating: 4.7,
  //       students: 5890,
  //       price: 499,
  //       originalPrice: 799,
  //       badge: "Popular",
  //     },
  //     {
  //       id: "communication-skills",
  //       title: "Professional Communication",
  //       description: "Master business communication and presentation skills",
  //       image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop&q=80",
  //       duration: "12 hours",
  //       level: "Beginner",
  //       rating: 4.6,
  //       students: 4320,
  //       price: 349,
  //       originalPrice: 549,
  //     },
  //   ]
  // },
  // {
  //   name: "Cyber Security",
  //   description: "Protect organizations with industry-leading security certifications",
  //   courses: [
  //     {
  //       id: "cissp",
  //       title: "CISSP Certification",
  //       description: "Certified Information Systems Security Professional training",
  //       image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&q=80",
  //       duration: "40 hours",
  //       level: "Advanced",
  //       rating: 4.9,
  //       students: 7890,
  //       price: 1299,
  //       originalPrice: 1799,
  //       badge: "Best Seller",
  //     },
  //     {
  //       id: "ceh",
  //       title: "Certified Ethical Hacker",
  //       description: "Learn ethical hacking techniques and penetration testing",
  //       image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&q=80",
  //       duration: "36 hours",
  //       level: "Intermediate",
  //       rating: 4.8,
  //       students: 6540,
  //       price: 999,
  //       originalPrice: 1399,
  //       badge: "Trending",
  //     },
  //     {
  //       id: "comptia-security",
  //       title: "CompTIA Security+",
  //       description: "Foundation-level cybersecurity certification for IT professionals",
  //       image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop&q=80",
  //       duration: "28 hours",
  //       level: "Beginner",
  //       rating: 4.7,
  //       students: 8920,
  //       price: 699,
  //       originalPrice: 999,
  //       badge: "Popular",
  //     },
  //   ]
  // },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner": return "bg-green-100 text-green-700";
    case "Intermediate": return "bg-blue-100 text-blue-700";
    case "Advanced": return "bg-purple-100 text-purple-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const getBadgeStyle = (badge: string) => {
  switch (badge) {
    case "Best Seller": return "bg-primary text-white";
    case "New": return "bg-green-600 text-white";
    case "Trending": return "bg-primary text-white";
    case "Popular": return "bg-secondary text-white";
    default: return "bg-primary text-white";
  }
};

export default function Courses() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <section className="relative bg-gradient-to-r from-primary via-primary to-secondary text-white py-20 mt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4" 
            data-testid="text-courses-hero-title"
          >
            Professional Certification Courses
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            Accelerate your career with industry-recognized certifications from global leaders
          </motion.p>
        </div>
      </section>

      <section className="flex-1 py-16 bg-gray-50" data-testid="section-courses">
        <div className="max-w-7xl mx-auto px-6">
          {courseCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" data-testid={`text-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  {category.name}
                </h2>
                <p className="text-gray-600">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.courses.map((course, courseIndex) => (
                  <CourseCard
                    key={`${category.name}-${course.id}`}
                    course={course}
                    categoryIndex={categoryIndex}
                    courseIndex={courseIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Browse our training schedules and enroll in your preferred certification program today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/training-schedule">
              <Button
                size="lg"
                className="px-8 bg-white text-primary font-semibold hover:bg-gray-100 shadow-lg"
                data-testid="button-view-schedule"
              >
                View Training Schedule
              </Button>
            </Link>
            <Link href="/corporate">
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-2 border-white text-white font-semibold hover:bg-white/10"
                data-testid="button-corporate-training"
              >
                Corporate Training
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CourseCard({ 
  course, 
  categoryIndex, 
  courseIndex 
}: { 
  course: Course; 
  categoryIndex: number; 
  courseIndex: number;
}) {
  const { formatPrice } = useCurrency();
  const { pricing, loading } = useCoursePricing(course.id);
  
  // Use pricing from Excel if available, otherwise fallback to hardcoded price
  // Note: Excel prices are already in local currency (INR, GBP, USD, etc.), not USD
  const displayPrice = pricing ? pricing.total : course.price;
  const displayOriginalPrice = pricing 
    ? (pricing.amount + (pricing.sgst || 0) + (pricing.cgst || 0) + (pricing.salesTax || 0) + (pricing.vat || 0) + (pricing.tax || 0) + (pricing.serviceTax || 0) || pricing.amount * 1.18)
    : course.originalPrice;
  
  // Format price: if from Excel, use its currency directly; otherwise use formatPrice (expects USD)
  const formatDisplayPrice = (amount: number) => {
    if (pricing) {
      // Excel price is already in local currency, format it directly
      try {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: pricing.countryCurrency,
          minimumFractionDigits: 0,
          maximumFractionDigits: pricing.countryCurrency === "JPY" ? 0 : 2,
        }).format(amount);
      } catch {
        return `${pricing.countryCurrency} ${amount.toLocaleString()}`;
      }
    } else {
      // Fallback price is in USD, use formatPrice
      return formatPrice(amount);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (courseIndex * 0.05) }}
    >
      <Link href={`/courses/${course.id}`}>
        <Card 
          className="group cursor-pointer overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 rounded-xl h-full flex flex-col"
          data-testid={`card-course-${course.id}`}
        >
          <div className="h-44 relative overflow-hidden">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            {course.badge && (
              <div className="absolute top-4 left-4">
                <span className={`${getBadgeStyle(course.badge)} text-xs font-semibold px-3 py-1.5 rounded-full shadow-md`}>
                  {course.badge}
                </span>
              </div>
            )}
            
            <div className="absolute top-4 right-4">
              <span className={`${getLevelColor(course.level)} text-xs font-medium px-2.5 py-1 rounded-full`}>
                {course.level}
              </span>
            </div>
            
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
          </div>
          
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
              {course.description}
            </p>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1 text-gray-500">
                <Users className="w-4 h-4" />
                <span className="text-sm">{course.students.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
              <div className="flex items-center gap-2">
                {loading ? (
                  <span className="text-sm text-gray-500">Loading...</span>
                ) : (
                  <>
                    <span className="text-xl font-bold text-primary">{formatDisplayPrice(displayPrice)}</span>
                    <span className="text-sm text-gray-400 line-through">{formatDisplayPrice(displayOriginalPrice)}</span>
                  </>
                )}
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white px-4 text-sm font-semibold"
              >
                Enroll
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
