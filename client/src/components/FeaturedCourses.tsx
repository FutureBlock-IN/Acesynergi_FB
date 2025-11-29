import { motion } from "framer-motion";
import { Star, Users, Clock, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { useState } from "react";

const courses = [
  {
    id: "cbap",
    title: "CBAP Certification Training",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&q=80",
    instructor: "Emmanuel K, CBAP",
    rating: 4.9,
    reviewCount: 2341,
    students: 12450,
    duration: "35 hours",
    price: 999,
    originalPrice: 1499,
    badge: "Best Seller",
    category: "Business Analysis",
  },
  {
    id: "ecba",
    title: "ECBA Certification Training",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=400&fit=crop&q=80",
    instructor: "Sarah Johnson, ECBA",
    rating: 4.8,
    reviewCount: 1823,
    students: 8920,
    duration: "21 hours",
    price: 699,
    originalPrice: 999,
    badge: "Popular",
    category: "Business Analysis",
  },
  {
    id: "ccba",
    title: "CCBA Certification Training",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80",
    instructor: "Michael Chen, CCBA",
    rating: 4.8,
    reviewCount: 1456,
    students: 6340,
    duration: "28 hours",
    price: 849,
    originalPrice: 1299,
    badge: "Premium",
    category: "Business Analysis",
  },
  {
    id: "ccba-prep",
    title: "CCBA Prep Course",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&q=80",
    instructor: "Lisa Park, CCBA",
    rating: 4.7,
    reviewCount: 892,
    students: 3120,
    duration: "16 hours",
    price: 499,
    originalPrice: 799,
    badge: "Hot",
    category: "Business Analysis",
  },
  {
    id: "genai-scrum-master",
    title: "Gen AI for Scrum Masters",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&q=80",
    instructor: "Alex Thompson, CSM",
    rating: 4.9,
    reviewCount: 892,
    students: 3450,
    duration: "16 hours",
    price: 599,
    originalPrice: 899,
    badge: "New",
    category: "Gen AI",
  },
  {
    id: "genai-project-managers",
    title: "Gen AI for Project Managers",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
    instructor: "David Lee, PMP",
    rating: 4.8,
    reviewCount: 1245,
    students: 4870,
    duration: "20 hours",
    price: 699,
    originalPrice: 999,
    badge: "Trending",
    category: "Gen AI",
  },
  {
    id: "genai-product-owner",
    title: "Gen AI for Product Owners",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&q=80",
    instructor: "Maria Santos, CSPO",
    rating: 4.7,
    reviewCount: 756,
    students: 2890,
    duration: "16 hours",
    price: 599,
    originalPrice: 899,
    badge: "Popular",
    category: "Gen AI",
  },
  {
    id: "genai-business-analysts",
    title: "Gen AI for Business Analysts",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80",
    instructor: "Emily Rodriguez, CBAP",
    rating: 4.7,
    reviewCount: 967,
    students: 2890,
    duration: "16 hours",
    price: 599,
    originalPrice: 899,
    badge: "Popular",
    category: "Gen AI",
  },
  {
    id: "genai-interview-prep",
    title: "Interview Prep for Scrum Masters",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop&q=80",
    instructor: "James Wilson, CSM",
    rating: 4.6,
    reviewCount: 634,
    students: 1890,
    duration: "8 hours",
    price: 299,
    originalPrice: 499,
    badge: "New",
    category: "Gen AI",
  },
];

export default function FeaturedCourses() {
  const [currentRow, setCurrentRow] = useState(0);
  const coursesPerRow = 3;
  const totalRows = Math.ceil(courses.length / coursesPerRow);

  const nextRow = () => {
    setCurrentRow((prev) => (prev + 1) % totalRows);
  };

  const prevRow = () => {
    setCurrentRow((prev) => (prev - 1 + totalRows) % totalRows);
  };

  const getVisibleCourses = () => {
    const start = currentRow * coursesPerRow;
    return courses.slice(start, start + coursesPerRow);
  };

  return (
    <section className="py-20 md:py-24 bg-slate-50" data-testid="section-courses" id="courses">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900" data-testid="text-courses-title">
            Featured Courses of This Month
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked professional certification courses from industry experts
          </p>
        </motion.div>

        <div className="relative">
          <Button
            size="icon"
            onClick={prevRow}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg"
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            size="icon"
            onClick={nextRow}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg"
            data-testid="button-carousel-next"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getVisibleCourses().map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalRows }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentRow(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentRow === index ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
                }`}
                data-testid={`dot-${index}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/courses">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 shadow-lg"
              data-testid="button-view-all-courses"
            >
              View All Courses
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CourseCard({ course, index }: { course: typeof courses[0]; index: number }) {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Best Seller":
        return "bg-primary text-white";
      case "Premium":
        return "bg-purple-600 text-white";
      case "New":
        return "bg-green-600 text-white";
      case "Popular":
        return "bg-secondary text-white";
      case "Trending":
        return "bg-primary text-white";
      case "Hot":
        return "bg-red-500 text-white";
      default:
        return "bg-primary text-white";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      data-testid={`card-course-${course.id}`}
    >
      <Link href={`/courses/${course.id}`}>
        <Card className="overflow-hidden group cursor-pointer transition-all duration-300 bg-white rounded-xl border-0 shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          <div className="relative overflow-hidden aspect-video">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            <div className="absolute top-3 right-3">
              <span className={`${getBadgeColor(course.badge)} px-3 py-1.5 text-xs font-semibold rounded-full shadow-md`}>
                {course.badge}
              </span>
            </div>
          </div>

          <div className="p-5">
            <p className="text-xs text-secondary font-semibold mb-2 uppercase tracking-wide">
              {course.category}
            </p>

            <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-900 group-hover:text-primary transition-colors" data-testid={`text-course-title-${course.id}`}>
              {course.title}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <Award className="w-3 h-3 text-gray-600" />
              </div>
              <p className="text-xs text-gray-600">{course.instructor}</p>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold text-gray-900">{course.rating}</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(course.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({course.reviewCount.toLocaleString()})</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary">${course.price}</span>
                <span className="text-sm text-gray-400 line-through">${course.originalPrice}</span>
              </div>
              <Button
                size="sm"
                className="px-4 font-semibold bg-primary hover:bg-primary/90 text-white"
                data-testid={`button-enroll-${course.id}`}
              >
                Enroll Now
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
