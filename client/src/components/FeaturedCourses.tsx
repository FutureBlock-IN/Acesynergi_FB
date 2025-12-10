import { motion } from "framer-motion";
import { Star, Users, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "wouter";

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
    type: "certification", // certification, skill-based, popular
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
    type: "popular", // Also popular
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
    type: "certification",
  },
  {
    id: "pmp",
    title: "PMP® Certification Training",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&q=80",
    instructor: "David Lee, PMP",
    rating: 4.9,
    reviewCount: 3456,
    students: 12450,
    duration: "36 hours",
    price: 999,
    originalPrice: 1499,
    badge: "Best Seller",
    category: "Project Management",
    type: "certification",
  },
  {
    id: "pmi-acp",
    title: "PMI-ACP® Certification Training",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
    instructor: "Michael Chen, PMI-ACP",
    rating: 4.8,
    reviewCount: 2156,
    students: 8560,
    duration: "21 hours",
    price: 899,
    originalPrice: 1299,
    badge: "Popular",
    category: "Project Management",
    type: "popular",
  },
  {
    id: "capm",
    title: "CAPM® Certification Training",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&q=80",
    instructor: "Sarah Johnson, CAPM",
    rating: 4.7,
    reviewCount: 1834,
    students: 7230,
    duration: "23 hours",
    price: 699,
    originalPrice: 999,
    badge: "New",
    category: "Project Management",
    type: "certification",
  },
  {
    id: "pmipba",
    title: "PMI PBA Certification Training",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80",
    instructor: "Emily Rodriguez, PMI-PBA",
    rating: 4.8,
    reviewCount: 1245,
    students: 5670,
    duration: "24 hours",
    price: 749,
    originalPrice: 1099,
    badge: "Premium",
    category: "Project Management",
    type: "certification",
  },
];

export default function FeaturedCourses() {
  const getFilteredCourses = (type: string) => {
    // All courses in the dropdown menu - Project Management first, then Business Analysis
    const dropdownCourseIds = ["pmp", "pmi-acp", "capm", "pmipba", "cbap", "ccba", "ecba"];
    
    if (type === "popular") {
      // Show all courses from the dropdown menu, sorted: Project Management first, then Business Analysis
      const filtered = courses.filter((course) => dropdownCourseIds.includes(course.id));
      return filtered.sort((a, b) => {
        // Project Management courses first
        if (a.category === "Project Management" && b.category !== "Project Management") return -1;
        if (a.category !== "Project Management" && b.category === "Project Management") return 1;
        // Within same category, maintain dropdown order
        const indexA = dropdownCourseIds.indexOf(a.id);
        const indexB = dropdownCourseIds.indexOf(b.id);
        return indexA - indexB;
      });
    } else if (type === "certification") {
      return courses.filter((course) => course.type === "certification");
    } else if (type === "skill-based") {
      return courses.filter((course) => course.type === "skill-based");
    }
    return courses;
  };

  return (
    <section className="py-12 md:py-16 bg-slate-50" data-testid="section-courses" id="courses">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900" data-testid="text-courses-title">
            Expert-Recommended Courses
          </h2>
        </motion.div>

        <Tabs defaultValue="popular" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
              <TabsTrigger
                value="popular"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-6 py-3 text-base font-semibold"
              >
                Popular Courses
              </TabsTrigger>
              <TabsTrigger
                value="certification"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-6 py-3 text-base font-semibold"
              >
                Certification Programs
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="popular" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredCourses("popular").map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certification" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredCourses("certification").map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

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
