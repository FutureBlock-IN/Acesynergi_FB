import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Tag, Minus, Plus, Clock, MapPin, ChevronDown, ChevronUp, ArrowRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cartContext";
import { useCurrency } from "@/lib/currencyContext";
import { getHardcodedCoursePricing, formatMoney } from "@/lib/hardcodedCoursePricing";
import { Link } from "wouter";
import scheduleBg from "@assets/stock_images/professional_busines_10dc0c76.jpg";
import schedulesData from "@/data/schedules.json";

// JSON structure interfaces
interface Session {
  start_date: string;
  end_date: string;
  format: string;
  price: { currency: string; amount: number };
  quantity: number;
}

interface CourseSchedule {
  course_code: string;
  course_name: string;
  sessions: Session[];
}

interface SchedulesData {
  courses: CourseSchedule[];
}

// Converted Schedule interface for UI
interface Schedule {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  dates: string;
  startDate: string;
  endDate: string;
  mode: string;
  price: number;
  currency: string;
  quantity: number;
  days: number;
}

interface RelatedCourse {
  id: string;
  title: string;
  category: string;
  duration: string;
}

// Helper function to map courseId to course_code
function getCourseCode(courseId: string): string {
  const courseCodeMap: Record<string, string> = {
    "pmp": "PMP",
    "pmi-acp": "PMI-ACP",
    "pmipba": "PMI-PBA",
    "capm": "CAPM",
    "cbap": "CBAP",
    "ecba": "ECBA",
    "ccba": "CCBA",
  };
  return courseCodeMap[courseId.toLowerCase()] || courseId.toUpperCase();
}

// Helper function to calculate days between dates
function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
  return diffDays;
}

// Helper function to format date range
function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startFormatted = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endFormatted = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${startFormatted} - ${endFormatted}`;
}

// Convert JSON sessions to Schedule format
function convertSessionsToSchedules(data: SchedulesData): Schedule[] {
  const schedules: Schedule[] = [];
  
  data.courses.forEach((course) => {
    course.sessions.forEach((session, index) => {
      const startDate = new Date(session.start_date);
      const endDate = new Date(session.end_date);
      
      schedules.push({
        id: `${course.course_code}-${index}-${session.start_date}`,
        courseCode: course.course_code,
        courseName: course.course_name,
        title: course.course_name,
        dates: formatDateRange(session.start_date, session.end_date),
        startDate: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        endDate: endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        mode: session.format,
        price: session.price.amount,
        currency: session.price.currency,
        quantity: session.quantity,
        days: calculateDays(session.start_date, session.end_date),
      });
    });
  });
  
  return schedules;
}

// Legacy hardcoded schedules (removed - now using JSON)
const onlineSchedules: Schedule[] = [];

const relatedCourses: RelatedCourse[] = [
  { id: "cbap", title: "CBAP Certification Training", category: "Business Management", duration: "35 hours" },
  { id: "ecba", title: "ECBA Certification Training", category: "Business Management", duration: "21 hours" },
  { id: "ccba", title: "CCBA Certification Training", category: "Business Management", duration: "28 hours" },
  { id: "ccba-prep", title: "CCBA Prep Course", category: "Business Management", duration: "16 hours" },
  { id: "pmp", title: "PMP Certification Training", category: "Project Management", duration: "36 hours" },
  { id: "pmi-acp", title: "PMI-ACP® Certification Training", category: "Project Management", duration: "21 hours" },
  { id: "capm", title: "CAPM® Certification Training", category: "Project Management", duration: "23 hours" },
  { id: "genai-scrum-master", title: "Gen AI for Scrum Masters", category: "Gen AI Courses", duration: "16 hours" },
  { id: "genai-project-managers", title: "Gen AI for Project Managers", category: "Gen AI Courses", duration: "20 hours" },
  { id: "genai-product-owner", title: "Gen AI for Product Owners", category: "Gen AI Courses", duration: "16 hours" },
  { id: "genai-business-analysts", title: "Gen AI for Business Analysts", category: "Gen AI Courses", duration: "16 hours" },
  { id: "genai-interview-prep", title: "Gen AI Interview Prep for Scrum Masters", category: "Gen AI Courses", duration: "8 hours" },
];

// Helper function to map courseId to category slug
function getCourseCategory(courseId: string): "project-management" | "business-management" | null {
  const projectManagementCourses = ["pmp", "pmi-acp", "capm", "pmipba"];
  const businessManagementCourses = ["cbap", "ecba", "ccba"];
  
  if (projectManagementCourses.includes(courseId)) {
    return "project-management";
  }
  if (businessManagementCourses.includes(courseId)) {
    return "business-management";
  }
  return null;
}

export default function Schedule() {
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [activeMode, setActiveMode] = useState<"classroom" | "online" | "self">("online");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  // Get category and course_code from URL query params
  const searchParams = new URLSearchParams(window.location.search);
  const selectedCategory = searchParams.get("category") as "project-management" | "business-management" | null;
  const selectedCourseCode = searchParams.get("course_code") as string | null;
  
  // Load schedules from JSON
  const allSchedules = useMemo(() => {
    return convertSessionsToSchedules(schedulesData as SchedulesData);
  }, []);
  
  // Initialize quantities from loaded schedules
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    return allSchedules.reduce((acc, schedule) => ({ ...acc, [schedule.id]: schedule.quantity || 1 }), {});
  });
  
  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };
  
  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };
  
  const handleEnroll = (schedule: Schedule) => {
    // Map course_code back to courseId for cart
    const courseIdMap: Record<string, string> = {
      "PMP": "pmp",
      "PMI-ACP": "pmi-acp",
      "PMI-PBA": "pmipba",
      "CAPM": "capm",
      "CBAP": "cbap",
      "ECBA": "ecba",
      "CCBA": "ccba",
    };
    const courseId = courseIdMap[schedule.courseCode] || schedule.courseCode.toLowerCase();
    
    addToCart({
      id: schedule.id,
      courseId: courseId,
      title: schedule.title,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      duration: `${schedule.days} Days`,
      format: schedule.mode,
      price: schedule.price,
      originalPrice: schedule.price, // Use same price as original for now
      quantity: quantities[schedule.id] || 1,
      dates: schedule.dates,
    });
    setLocation("/cart");
  };
  
  const getSchedulesForMode = () => {
    // Filter by format/mode
    const modeMap: Record<"classroom" | "online" | "self", string[]> = {
      "online": ["Live Online Classroom"],
      "classroom": ["Classroom", "Live Online Classroom"],
      "self": ["Self Learning", "Self-Learning", "Self"]
    };
    
    const allowedFormats = modeMap[activeMode] || [];
    return allSchedules.filter(schedule => {
      if (activeMode === "online") {
        return schedule.mode === "Live Online Classroom";
      }
      // For classroom and self, show all for now (can be filtered later)
      return true;
    });
  };
  
  // Filter schedules by course_code (STRICT: only show selected course)
  const filteredSchedules = useMemo(() => {
    let schedules = getSchedulesForMode();
    
    // Priority 1: Filter by course_code if provided (STRICT - only this course)
    if (selectedCourseCode) {
      schedules = schedules.filter((schedule) => schedule.courseCode === selectedCourseCode);
    }
    // Priority 2: Filter by category if no course_code
    else if (selectedCategory) {
      schedules = schedules.filter((schedule) => {
        // Map course_code to category
        const projectManagementCodes = ["PMP", "PMI-ACP", "CAPM", "PMI-PBA"];
        const businessManagementCodes = ["CBAP", "ECBA", "CCBA"];
        
        if (selectedCategory === "project-management") {
          return projectManagementCodes.includes(schedule.courseCode);
        }
        if (selectedCategory === "business-management") {
          return businessManagementCodes.includes(schedule.courseCode);
        }
        return false;
      });
    }
    
    // For Self Learning tab, show only one card
    if (activeMode === "self") {
      schedules = schedules.slice(0, 1);
    }
    
    return schedules;
  }, [selectedCourseCode, selectedCategory, activeMode, allSchedules]);
  
  const currentSchedules = filteredSchedules;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative bg-[#1a1a1a] text-white py-20 mt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={scheduleBg}
            alt="Schedule"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Training Schedule</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Find the perfect training session that fits your schedule
          </p>
        </div>
      </section>

      {/* Schedule Content */}
      <section className="flex-1 py-12" data-testid="section-schedule">
        <div className="max-w-5xl mx-auto px-6">
          {/* Filter Tabs */}
          <div className="flex gap-4 mb-8 flex-wrap">
            <button
              onClick={() => setActiveMode("classroom")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeMode === "classroom"
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-700 hover:shadow-md"
              }`}
              data-testid="tab-classroom"
            >
              Classroom
            </button>
            <button
              onClick={() => setActiveMode("online")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeMode === "online"
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-700 hover:shadow-md"
              }`}
              data-testid="tab-online"
            >
              Live Online Classroom
            </button>
            <button
              onClick={() => setActiveMode("self")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeMode === "self"
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-700 hover:shadow-md"
              }`}
              data-testid="tab-self"
            >
              Self Learning
            </button>
          </div>

          {/* Schedule Cards or Coming Soon */}
          {currentSchedules.length > 0 ? (
            <div className="space-y-4">
              {currentSchedules.map((schedule, index) => (
                <ScheduleCard
                  key={schedule.id}
                  schedule={schedule}
                  index={index}
                  activeMode={activeMode}
                  quantities={quantities}
                  expandedCard={expandedCard}
                  onQuantityChange={handleQuantityChange}
                  onToggleExpand={toggleExpand}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              {selectedCourseCode ? (
                <p className="text-gray-600">
                  No schedules available for this course at the moment.
                </p>
              ) : selectedCategory ? (
                <p className="text-gray-600">
                  No enrollments available for this category at the moment.
                </p>
              ) : (
                <p className="text-gray-600">No schedules available for this mode.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Related Courses Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our comprehensive range of professional certification courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/courses/${course.id}`}>
                  <Card 
                    className="p-6 bg-gray-50 hover:bg-white border-none shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer group"
                    data-testid={`card-related-${course.id}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Badge className="bg-primary/10 text-primary text-xs mb-3">
                          {course.category}
                        </Badge>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                        <ArrowRight className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/courses">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-8 h-12"
                data-testid="button-view-all-courses"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Separate component for schedule card to use pricing hook
function ScheduleCard({
  schedule,
  index,
  activeMode,
  quantities,
  expandedCard,
  onQuantityChange,
  onToggleExpand,
  onEnroll,
}: {
  schedule: Schedule;
  index: number;
  activeMode: "classroom" | "online" | "self";
  quantities: Record<string, number>;
  expandedCard: string | null;
  onQuantityChange: (id: string, delta: number) => void;
  onToggleExpand: (id: string) => void;
  onEnroll: (schedule: Schedule) => void;
}) {
  // Map course_code back to courseId for pricing lookup
  const courseIdMap: Record<string, string> = {
    "PMP": "pmp",
    "PMI-ACP": "pmi-acp",
    "PMI-PBA": "pmipba",
    "CAPM": "capm",
    "CBAP": "cbap",
    "ECBA": "ecba",
    "CCBA": "ccba",
  };
  const courseId = courseIdMap[schedule.courseCode] || schedule.courseCode.toLowerCase();
  const { country } = useCurrency();
  
  // Get hardcoded pricing based on course and country
  const hardcodedPricing = getHardcodedCoursePricing(courseId, country || "");
  
  // Select price based on active mode (STRICT: no fallback to virtual)
  let displayPrice: number;
  let currency: string;
  
  if (hardcodedPricing) {
    currency = hardcodedPricing.currency;
    // Mode-specific price selection (NO FALLBACK)
    if (activeMode === "online") {
      displayPrice = hardcodedPricing.virtualLearningPrice;
    } else if (activeMode === "classroom") {
      displayPrice = hardcodedPricing.classroomLearningPrice;
    } else if (activeMode === "self") {
      displayPrice = hardcodedPricing.selfLearningPrice;
    } else {
      // Should never happen, but default to virtual if mode is invalid
      displayPrice = hardcodedPricing.virtualLearningPrice;
    }
  } else {
    // Use price from JSON schedule
    displayPrice = schedule.price;
    currency = schedule.currency;
  }
  
  // Format price with currency
  const formatDisplayPrice = (amount: number) => {
    return formatMoney(amount, currency);
  };
  
  const quantity = quantities[schedule.id] || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="bg-white shadow-lg border-0 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900">{schedule.title}</h3>
                <Badge className="bg-primary/10 text-primary">{schedule.courseCode}</Badge>
              </div>
              {activeMode !== "self" && (
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{schedule.dates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-secondary" />
                    <span>{schedule.mode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{schedule.days} Days</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Price</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatDisplayPrice(displayPrice * quantity)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onQuantityChange(schedule.id, -1)}
                  className="p-2 hover:bg-gray-200 transition-colors rounded-l-lg"
                >
                  <Minus className="w-4 h-4 text-gray-700" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-0 bg-transparent focus:outline-none font-medium text-gray-900"
                />
                <button
                  onClick={() => onQuantityChange(schedule.id, 1)}
                  className="p-2 hover:bg-gray-200 transition-colors rounded-r-lg"
                >
                  <Plus className="w-4 h-4 text-gray-700" />
                </button>
              </div>

              <Button
                onClick={() => onEnroll(schedule)}
                className="bg-primary hover:bg-primary/90 text-white px-8 h-12 font-semibold"
              >
                Enroll Now
              </Button>

              <button
                onClick={() => onToggleExpand(schedule.id)}
                className="p-2 hover:bg-gray-200 transition-colors rounded-lg"
              >
                {expandedCard === schedule.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {expandedCard === schedule.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-200">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Course Details</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        {activeMode !== "self" && (
                          <>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span><strong>Duration:</strong> {schedule.days} Days</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-secondary" />
                              <span><strong>Format:</strong> {schedule.mode}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              <span><strong>Dates:</strong> {schedule.dates}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-4">
                        For detailed course information, prerequisites, and curriculum, please visit the course details page.
                      </p>
                      <Link href={`/courses/${courseId}`}>
                        <Button variant="outline">
                          View Course Details →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}
