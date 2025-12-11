import { useState } from "react";
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
import { useCoursePricing } from "@/hooks/useCoursePricing";
import { Link } from "wouter";
import scheduleBg from "@assets/stock_images/professional_busines_10dc0c76.jpg";

interface Schedule {
  id: string;
  courseId: string;
  title: string;
  dates: string;
  startDate: string;
  endDate: string;
  mode: string;
  price: number;
  originalPrice: number;
  time: string;
  venue: string;
  days: number;
  description: string;
  whatYouLearn: string[];
  prerequisites: string[];
  curriculum: string[];
  instructor: string;
}

interface RelatedCourse {
  id: string;
  title: string;
  category: string;
  duration: string;
}

const onlineSchedules: Schedule[] = [
  { 
    id: "1", 
    courseId: "cbap",
    title: "CBAP Certification Training", 
    dates: "Dec 5 - 8, 2025",
    startDate: "Dec 5",
    endDate: "Dec 8", 
    mode: "Live Online Classroom", 
    price: 1299,
    originalPrice: 1799,
    time: "9 AM - 5 PM",
    venue: "Online Classroom",
    days: 4,
    description: "This CBAP certification training is ideal for professionals seeking to gain a globally recognized certified business analysis professional certification aligned with BABOK® Guide v3.",
    whatYouLearn: [
      "Planning and monitoring business analysis processes",
      "Eliciting, analysing, and managing requirements",
      "Managing the entire project lifecycle",
      "Conducting strategic analysis for business solutions",
      "Evaluating and optimising solutions"
    ],
    prerequisites: [
      "High school diploma or undergraduate degree",
      "7,500 hours of business analysis experience in the last 10 years",
      "900 hours in four of the six BABOK® v3 Knowledge Areas",
      "35 hours of professional development in the past four years"
    ],
    curriculum: [
      "Introduction to CBAP® Certification",
      "Introduction to BABOK® V3",
      "Business Analysis Planning and Monitoring",
      "Elicitation and Collaboration",
      "Requirements Life Cycle Management",
      "Strategy Analysis",
      "Requirements Analysis and Design Definition",
      "Solution Evaluation"
    ],
    instructor: "Dr. Sarah Mitchell, CBAP, PMI-PBA"
  },
  // { 
  //   id: "2", 
  //   courseId: "cbap",
  //   title: "CBAP Certification Training", 
  //   dates: "Dec 15 - 18, 2025",
  //   startDate: "Dec 15",
  //   endDate: "Dec 18", 
  //   mode: "Live Online Classroom", 
  //   price: 1299,
  //   originalPrice: 1799,
  //   time: "9 AM - 5 PM",
  //   venue: "Online Classroom",
  //   days: 4,
  //   description: "This CBAP certification training is ideal for professionals seeking to gain a globally recognized certified business analysis professional certification aligned with BABOK® Guide v3.",
  //   whatYouLearn: [
  //     "Planning and monitoring business analysis processes",
  //     "Eliciting, analysing, and managing requirements",
  //     "Managing the entire project lifecycle",
  //     "Conducting strategic analysis for business solutions",
  //     "Evaluating and optimising solutions"
  //   ],
  //   prerequisites: [
  //     "High school diploma or undergraduate degree",
  //     "7,500 hours of business analysis experience in the last 10 years",
  //     "900 hours in four of the six BABOK® v3 Knowledge Areas",
  //     "35 hours of professional development in the past four years"
  //   ],
  //   curriculum: [
  //     "Introduction to CBAP® Certification",
  //     "Introduction to BABOK® V3",
  //     "Business Analysis Planning and Monitoring",
  //     "Elicitation and Collaboration",
  //     "Requirements Life Cycle Management",
  //     "Strategy Analysis",
  //     "Requirements Analysis and Design Definition",
  //     "Solution Evaluation"
  //   ],
  //   instructor: "Dr. Sarah Mitchell, CBAP, PMI-PBA"
  // },
  { 
    id: "3", 
    courseId: "ecba",
    title: "ECBA Certification Training", 
    dates: "Dec 10 - 12, 2025",
    startDate: "Dec 10",
    endDate: "Dec 12", 
    mode: "Live Online Classroom", 
    price: 899,
    originalPrice: 1299,
    time: "9 AM - 5 PM",
    venue: "Online Classroom",
    days: 3,
    description: "The Entry Certificate in Business Analysis (ECBA) training is designed for professionals new to business analysis who want to demonstrate foundational knowledge.",
    whatYouLearn: [
      "Understanding business analysis fundamentals",
      "Learning BABOK® Guide v3 knowledge areas",
      "Developing requirements elicitation techniques",
      "Documenting and managing requirements",
      "Understanding stakeholder analysis"
    ],
    prerequisites: [
      "No prior experience required",
      "21 hours of professional development training in business analysis"
    ],
    curriculum: [
      "Introduction to Business Analysis",
      "Business Analysis Planning and Monitoring",
      "Elicitation and Collaboration",
      "Requirements Life Cycle Management",
      "Strategy Analysis",
      "Requirements Analysis and Design Definition"
    ],
    instructor: "Michael Chen, ECBA, CCBA"
  },
  { 
    id: "4", 
    courseId: "ccba",
    title: "CCBA Certification Training", 
    dates: "Dec 12 - 15, 2025",
    startDate: "Dec 12",
    endDate: "Dec 15", 
    mode: "Live Online Classroom", 
    price: 1099,
    originalPrice: 1599,
    time: "9 AM - 5 PM",
    venue: "Online Classroom",
    days: 4,
    description: "The Certification of Capability in Business Analysis (CCBA) training is designed for professionals with 2-3 years of business analysis experience.",
    whatYouLearn: [
      "Advanced requirements elicitation techniques",
      "Complex stakeholder management",
      "Business process modeling",
      "Solution assessment and validation",
      "Strategic analysis methodologies"
    ],
    prerequisites: [
      "3,750 hours of business analysis work experience in the last 7 years",
      "900 hours in two of the six BABOK® v3 Knowledge Areas",
      "21 hours of professional development"
    ],
    curriculum: [
      "CCBA Certification Overview",
      "Business Analysis Planning and Monitoring",
      "Elicitation and Collaboration Techniques",
      "Requirements Life Cycle Management",
      "Strategy Analysis",
      "Requirements Analysis and Design Definition",
      "Solution Evaluation"
    ],
    instructor: "Jessica Wong, CCBA, CBAP"
  },
  { 
    id: "5", 
    courseId: "pmp",
    title: "PMP Certification Training", 
    dates: "Dec 8 - 9, 2025",
    startDate: "Dec 8",
    endDate: "Dec 9", 
    mode: "Live Online Classroom", 
    price: 699,
    originalPrice: 999,
    time: "9 AM - 5 PM",
    venue: "Online Classroom",
    days: 2,
    description: "Learn how to leverage Generative AI tools to enhance your Scrum Master role with AI-powered sprint planning and team productivity optimization.",
    whatYouLearn: [
      "Using AI for sprint planning and estimation",
      "AI-powered retrospective analysis",
      "Automating Scrum artifacts with AI",
      "AI tools for team collaboration",
      "Predictive analytics for sprint success"
    ],
    prerequisites: [
      "Basic understanding of Scrum framework",
      "CSM or PSM certification preferred but not required"
    ],
    curriculum: [
      "Introduction to Gen AI in Agile",
      "AI Tools for Sprint Planning",
      "Automating Daily Standups",
      "AI-Powered Retrospectives",
      "Predictive Analytics for Sprints"
    ],
    instructor: "David Park, CSM, AI Specialist"
  },
  { 
    id: "6", 
    courseId: "pmipba",
    title: "PMI PBA Certification Training", 
    dates: "Dec 18 - 20, 2025",
    startDate: "Dec 18",
    endDate: "Dec 20", 
    mode: "Live Online Classroom", 
    price: 899,
    originalPrice: 1299,
    time: "9 AM - 5 PM",
    venue: "Online Classroom",
    days: 3,
    description: "Master the use of Generative AI to streamline project management workflows, automate reporting, and enhance decision-making.",
    whatYouLearn: [
      "AI-powered project planning and scheduling",
      "Automated risk assessment with AI",
      "AI tools for stakeholder communication",
      "Predictive project analytics",
      "AI-driven resource optimization"
    ],
    prerequisites: [
      "Project management experience required",
      "PMP or PRINCE2 certification preferred"
    ],
    curriculum: [
      "Gen AI Fundamentals for PM",
      "AI in Project Planning",
      "Risk Management with AI",
      "AI-Powered Reporting",
      "Resource Optimization"
    ],
    instructor: "Rachel Adams, PMP, AI Strategist"
  },
  { 
    id: "7", 
    courseId: "pmi-acp",
    title: "PMI-ACP® Certification Training", 
    dates: "Jan 10 - 12, 2026",
    startDate: "Jan 10",
    endDate: "Jan 12", 
    mode: "Live Online Classroom", 
    price: 899,
    originalPrice: 1299,
    time: "9 AM - 5 PM",
    venue: "Online Classroom",
    days: 3,
    description: "The PMI Agile Certified Practitioner (PMI-ACP)® certification demonstrates your knowledge of agile principles and your skill with agile techniques. This comprehensive training covers Scrum, Kanban, Lean, XP, and other agile methodologies.",
    whatYouLearn: [
      "Agile principles and methodologies",
      "Scrum, Kanban, and Lean practices",
      "Agile planning and estimation techniques",
      "Stakeholder engagement in agile projects",
      "Agile team dynamics and collaboration",
      "Continuous improvement practices"
    ],
    prerequisites: [
      "Secondary degree or four-year degree",
      "21 contact hours of training in agile practices",
      "12 months of general project experience within the last 5 years",
      "8 months of agile project experience within the last 3 years"
    ],
    curriculum: [
      "Introduction to Agile and PMI-ACP",
      "Agile Principles and Mindset",
      "Value-Driven Delivery",
      "Stakeholder Engagement",
      "Team Performance",
      "Adaptive Planning",
      "Problem Detection and Resolution",
      "Continuous Improvement"
    ],
    instructor: "Michael Chen, PMI-ACP, CSM"
  },
  { 
    id: "8", 
    courseId: "pmi-acp",
    title: "PMI-ACP® Certification Training", 
    dates: "Jan 20 - 22, 2026",
    startDate: "Jan 20",
    endDate: "Jan 22", 
    mode: "Live Online Classroom", 
    price: 899,
    originalPrice: 1299,
    time: "9 AM - 5 PM",
    venue: "Online Classroom",
    days: 3,
    description: "The PMI Agile Certified Practitioner (PMI-ACP)® certification demonstrates your knowledge of agile principles and your skill with agile techniques. This comprehensive training covers Scrum, Kanban, Lean, XP, and other agile methodologies.",
    whatYouLearn: [
      "Agile principles and methodologies",
      "Scrum, Kanban, and Lean practices",
      "Agile planning and estimation techniques",
      "Stakeholder engagement in agile projects",
      "Agile team dynamics and collaboration",
      "Continuous improvement practices"
    ],
    prerequisites: [
      "Secondary degree or four-year degree",
      "21 contact hours of training in agile practices",
      "12 months of general project experience within the last 5 years",
      "8 months of agile project experience within the last 3 years"
    ],
    curriculum: [
      "Introduction to Agile and PMI-ACP",
      "Agile Principles and Mindset",
      "Value-Driven Delivery",
      "Stakeholder Engagement",
      "Team Performance",
      "Adaptive Planning",
      "Problem Detection and Resolution",
      "Continuous Improvement"
    ],
    instructor: "Michael Chen, PMI-ACP, CSM"
  },
  { 
    id: "9", 
    courseId: "capm",
    title: "CAPM® Certification Training", 
    dates: "Jan 15 - 17, 2026",
    startDate: "Jan 15",
    endDate: "Jan 17", 
    mode: "Live Online Classroom", 
    price: 699,
    originalPrice: 999,
    time: "9 AM - 5 PM",
    venue: "Online Classroom",
    days: 3,
    description: "The Certified Associate in Project Management (CAPM)® is an entry-level certification for project practitioners. Designed for those who are new to project management, this certification demonstrates your understanding of fundamental project management knowledge and processes.",
    whatYouLearn: [
      "Project management fundamentals",
      "Project lifecycle and processes",
      "Project integration management",
      "Scope, schedule, and cost management",
      "Quality and resource management",
      "Risk and procurement management",
      "Stakeholder and communications management"
    ],
    prerequisites: [
      "Secondary degree (high school diploma or equivalent)",
      "23 contact hours of project management education",
      "OR 1,500 hours of project experience"
    ],
    curriculum: [
      "Introduction to CAPM and Project Management",
      "Project Management Framework",
      "Project Life Cycle and Organization",
      "Project Integration Management",
      "Project Scope Management",
      "Project Schedule Management",
      "Project Cost Management",
      "Project Quality Management"
    ],
    instructor: "Sarah Johnson, CAPM, PMP"
  },
  { 
    id: "10", 
    courseId: "capm",
    title: "CAPM® Certification Training", 
    dates: "Feb 5 - 7, 2026",
    startDate: "Feb 5",
    endDate: "Feb 7", 
    mode: "Live Online Classroom", 
    price: 699,
    originalPrice: 999,
    time: "9 AM - 5 PM",
    venue: "Online Classroom",
    days: 3,
    description: "The Certified Associate in Project Management (CAPM)® is an entry-level certification for project practitioners. Designed for those who are new to project management, this certification demonstrates your understanding of fundamental project management knowledge and processes.",
    whatYouLearn: [
      "Project management fundamentals",
      "Project lifecycle and processes",
      "Project integration management",
      "Scope, schedule, and cost management",
      "Quality and resource management",
      "Risk and procurement management",
      "Stakeholder and communications management"
    ],
    prerequisites: [
      "Secondary degree (high school diploma or equivalent)",
      "23 contact hours of project management education",
      "OR 1,500 hours of project experience"
    ],
    curriculum: [
      "Introduction to CAPM and Project Management",
      "Project Management Framework",
      "Project Life Cycle and Organization",
      "Project Integration Management",
      "Project Scope Management",
      "Project Schedule Management",
      "Project Cost Management",
      "Project Quality Management"
    ],
    instructor: "Sarah Johnson, CAPM, PMP"
  },
];

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

export default function Schedule() {
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [activeMode, setActiveMode] = useState<"classroom" | "online" | "self">("online");
  const [quantities, setQuantities] = useState<Record<string, number>>(
    onlineSchedules.reduce((acc, schedule) => ({ ...acc, [schedule.id]: 1 }), {})
  );
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

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
    addToCart({
      id: schedule.id,
      courseId: schedule.courseId, // Include courseId for pricing lookup
      title: schedule.title,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      duration: `${schedule.days} Days`,
      format: schedule.mode,
      price: schedule.price,
      originalPrice: schedule.originalPrice,
      quantity: quantities[schedule.id] || 1,
      dates: schedule.dates,
    });
    setLocation("/cart");
  };

  const getSchedulesForMode = () => {
    if (activeMode === "online") return onlineSchedules;
    return [];
  };

  const currentSchedules = getSchedulesForMode();

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
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-schedule-hero-title">
            TRAINING SCHEDULE
          </h1>
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
              <p className="text-gray-600">No schedules available for this mode.</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Courses Section */}
      <section className="py-16 bg-white" data-testid="section-related-courses">
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
  quantities,
  expandedCard,
  onQuantityChange,
  onToggleExpand,
  onEnroll,
}: {
  schedule: Schedule;
  index: number;
  quantities: Record<string, number>;
  expandedCard: string | null;
  onQuantityChange: (id: string, delta: number) => void;
  onToggleExpand: (id: string) => void;
  onEnroll: (schedule: Schedule) => void;
}) {
  const { formatPrice } = useCurrency();
  const { pricing, loading, error } = useCoursePricing(schedule.courseId);
  
  // Debug logging
  if (error) {
    console.warn(`[ScheduleCard] Pricing error for ${schedule.courseId}:`, error);
  }
  if (pricing) {
    console.log(`[ScheduleCard] Using Excel pricing for ${schedule.courseId}:`, pricing);
  } else if (!loading) {
    console.warn(`[ScheduleCard] No pricing found for ${schedule.courseId}, using fallback: ${schedule.price}`);
  }
  
  // Use pricing from Excel if available, otherwise fallback to schedule price
  // Note: Excel prices are already in local currency (INR, GBP, USD, etc.), not USD
  const displayPrice = pricing ? pricing.total : schedule.price;
  const displayOriginalPrice = pricing 
    ? (pricing.amount + (pricing.sgst || 0) + (pricing.cgst || 0) + (pricing.salesTax || 0) + (pricing.vat || 0) + (pricing.tax || 0) + (pricing.serviceTax || 0) || pricing.amount * 1.18)
    : schedule.originalPrice;
  
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
  const quantity = quantities[schedule.id] || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card 
                    className="bg-white rounded-xl overflow-hidden transition-all duration-300 border-none"
                    style={{
                      boxShadow: expandedCard === schedule.id 
                        ? "0 4px 16px rgba(0,0,0,0.12)" 
                        : "0 2px 8px rgba(0,0,0,0.08)"
                    }}
                    data-testid={`card-schedule-${schedule.id}`}
                  >
                    {/* Main Card Content */}
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Left Side - Course Info */}
                        <div className="flex-1 space-y-3">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {schedule.title}
                          </h3>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span className="font-medium">{schedule.dates}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Tag className="w-5 h-5 text-secondary" />
                            <span>{schedule.mode}</span>
                          </div>
                        </div>

                        {/* Right Side - Quantity, Price, Enroll */}
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 font-medium">Qty:</span>
                            <div className="flex items-center rounded-lg bg-gray-100">
                              <button
                                onClick={() => onQuantityChange(schedule.id, -1)}
                                className="p-2 hover:bg-gray-200 transition-colors rounded-l-lg"
                                data-testid={`button-decrease-${schedule.id}`}
                              >
                                <Minus className="w-4 h-4 text-gray-700" />
                              </button>
                              <input
                                type="number"
                                value={quantity}
                                readOnly
                                className="w-12 text-center border-0 bg-transparent focus:outline-none font-medium text-gray-900"
                                data-testid={`input-quantity-${schedule.id}`}
                              />
                              <button
                                onClick={() => onQuantityChange(schedule.id, 1)}
                                className="p-2 hover:bg-gray-200 transition-colors rounded-r-lg"
                                data-testid={`button-increase-${schedule.id}`}
                              >
                                <Plus className="w-4 h-4 text-gray-700" />
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-center">
                            {loading ? (
                              <div className="text-sm text-gray-500">Loading price...</div>
                            ) : (
                              <>
                                <div 
                                  className="text-2xl font-bold text-gray-900"
                                  data-testid={`text-price-total-${schedule.id}`}
                                >
                                  {formatDisplayPrice(displayPrice * quantity)}
                                </div>
                                <div 
                                  className="text-base text-gray-500 line-through"
                                  data-testid={`text-price-original-${schedule.id}`}
                                >
                                  {formatDisplayPrice(displayOriginalPrice * quantity)}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Enroll Button */}
                          <Button
                            onClick={() => onEnroll(schedule)}
                            className="bg-primary hover:bg-primary/90 text-white px-8 h-12 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 min-w-[120px]"
                            data-testid={`button-enroll-${schedule.id}`}
                          >
                            Enroll
                          </Button>
                        </div>
                      </div>

                      {/* More Details Toggle */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button 
                          onClick={() => onToggleExpand(schedule.id)}
                          className="flex items-center gap-2 text-primary hover:text-secondary font-medium text-sm transition-all duration-300"
                          data-testid={`button-more-details-${schedule.id}`}
                        >
                          {expandedCard === schedule.id ? (
                            <>
                              Show Less <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              More Details <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
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
                              {/* Description */}
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Course Description</h4>
                                <p className="text-gray-700 leading-relaxed">{schedule.description}</p>
                              </div>

                              {/* What You'll Learn */}
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn</h4>
                                <ul className="space-y-2">
                                  {schedule.whatYouLearn.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                                      <span className="text-green-600 mt-1">✓</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Prerequisites */}
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h4>
                                <ul className="space-y-2">
                                  {schedule.prerequisites.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                                      <span className="text-gray-400">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Curriculum */}
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Course Curriculum</h4>
                                <div className="grid md:grid-cols-2 gap-2">
                                  {schedule.curriculum.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                                      <span className="text-primary font-semibold">{idx + 1}.</span>
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Instructor & Additional Info */}
                              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Instructor</h4>
                                  <p className="text-gray-900 font-medium">{schedule.instructor}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Course Details</h4>
                                  <div className="space-y-1 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-primary" />
                                      <span>{schedule.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-4 h-4 text-secondary" />
                                      <span>{schedule.venue}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-primary" />
                                      <span>{schedule.days} Days</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
    </motion.div>
  );
}
