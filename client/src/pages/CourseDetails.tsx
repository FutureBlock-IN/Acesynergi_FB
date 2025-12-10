import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookOpen, Award, Users, TrendingUp, Phone, ChevronDown, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Link, useRoute } from "wouter";
import { useToast } from "@/hooks/use-toast";
import heroImg from "@assets/stock_images/professional_busines_e2b710fa.jpg";

interface CurriculumSection {
  title: string;
  items: string[];
}

interface CourseData {
  title: string;
  description: string;
  learningPoints: string[];
  prerequisites: string;
  whoCanDo: string[];
  examFormat?: {
    questions: string;
    type: string;
    duration: string;
    details: string;
  };
  curriculum: string[] | CurriculumSection[];
  features: { icon: any; text: string }[];
  faqs: { question: string; answer: string }[];
}

const coursesData: Record<string, CourseData> = {
  //  pmp
  
  

  cbap: {
    title: "CBAP Certification Training",
    description: "This CBAP certification training is ideal for professionals seeking to gain a globally recognized certified business analysis professional certification. The program is aligned with the BABOK® Guide v3 and helps you master business analysis skills including documentation, planning, and solution design.",
    learningPoints: [
      "Planning and monitoring business analysis processes",
      "Eliciting, analysing, and managing requirements",
      "Managing the entire project lifecycle",
      "Conducting strategic analysis for business solutions",
      "Evaluating and optimising solutions",
    ],
    prerequisites: "To qualify for the CBAP® exam, you need a high school diploma or undergraduate degree, 7,500 hours of business analysis experience in the last 10 years with 900 hours in four of the six BABOK® v3 Knowledge Areas, and 35 hours of professional development in the past four years.",
    whoCanDo: [
      "Business Architects",
      "Business Systems Analysts",
      "Data Analysts",
      "Enterprise Analysts",
      "Management Consultants",
      "Process Analysts",
      "Product Managers",
      "Product Owners",
      "Requirements Engineers",
      "Systems Analysts",
    ],
    examFormat: {
      questions: "120",
      type: "Multiple choice questions",
      duration: "3.5 hours",
      details: "Formulated from the BABOK Guide v3, exam contains both scenario and case study-based questions that are designed to test your ability to apply the BA concepts.",
    },
    curriculum: [
      "Introduction to CBAP® Certification",
      "Introduction to BABOK® V3",
      "Business Analysis Planning and Monitoring",
      "Elicitation and Collaboration",
      "Requirements Life Cycle Management",
      "Strategy Analysis",
      "Requirements Analysis and Design Definition",
      "Solution Evaluation",
      "Introduction to Agile Perspective",
      "Business Intelligence Perspective",
      "Information Technology Perspective",
      "Business Architecture Perspective",
      "Business Process Management Perspective",
    ],
    features: [
      { icon: Clock, text: "35 hours" },
      { icon: Award, text: "35 CDU's" },
      { icon: BookOpen, text: "Exam Application Assistance" },
      { icon: Users, text: "BABOK Guide Version 3" },
      { icon: CheckCircle, text: "Latest Case Studies" },
      { icon: TrendingUp, text: "24/7 Support" },
    ],
    faqs: [
      {
        question: "What are the prerequisites for CBAP certification?",
        answer: "To qualify for the CBAP® exam, you need a high school diploma or undergraduate degree, 7,500 hours of business analysis experience in the last 10 years with 900 hours in four of the six BABOK® v3 Knowledge Areas, and 35 hours of professional development in the past four years.",
      },
      {
        question: "How long is the CBAP certification valid?",
        answer: "CBAP certification is valid for three years. To maintain your certification, you need to earn 60 Continuing Development Units (CDUs) within the three-year cycle.",
      },
      {
        question: "What is the CBAP exam format?",
        answer: "The CBAP exam consists of 120 multiple choice questions to be completed in 3.5 hours. Questions are scenario and case study-based, designed to test your ability to apply BA concepts from the BABOK Guide v3.",
      },
      {
        question: "Is this training aligned with BABOK v3?",
        answer: "Yes, our CBAP certification training is fully aligned with the BABOK® Guide v3, covering all six knowledge areas and perspectives required for the certification exam.",
      },
    ],
  },
  ecba: {
    title: "ECBA Certification Training",
    description: "The Entry Certificate in Business Analysis (ECBA) is the first level of certification offered by IIBA. It is designed for professionals who are new to business analysis and want to demonstrate foundational knowledge and competencies.",
    learningPoints: [
      "Understanding business analysis fundamentals",
      "Learning BABOK® Guide v3 knowledge areas",
      "Developing requirements elicitation techniques",
      "Documenting and managing requirements",
      "Understanding stakeholder analysis",
    ],
    prerequisites: "No prior experience required. Candidates must have a minimum of 21 hours of professional development training in business analysis within the last 4 years.",
    whoCanDo: [
      "Aspiring Business Analysts",
      "Business Students",
      "IT Professionals",
      "Project Coordinators",
      "Quality Analysts",
      "Career Changers",
    ],
    curriculum: [
      "Introduction to Business Analysis",
      "Business Analysis Planning and Monitoring",
      "Elicitation and Collaboration",
      "Requirements Life Cycle Management",
      "Strategy Analysis",
      "Requirements Analysis and Design Definition",
      "Solution Evaluation",
      "ECBA Exam Preparation",
    ],
    features: [
      { icon: Clock, text: "21 hours" },
      { icon: Award, text: "21 CDU's" },
      { icon: BookOpen, text: "Exam Application Assistance" },
      { icon: Users, text: "BABOK Guide Version 3" },
      { icon: CheckCircle, text: "Practice Tests" },
      { icon: TrendingUp, text: "24/7 Support" },
    ],
    faqs: [
      {
        question: "Do I need experience to take ECBA?",
        answer: "No, ECBA is designed for entry-level professionals. You only need 21 hours of professional development training in business analysis within the last 4 years.",
      },
      {
        question: "What is the exam format?",
        answer: "The ECBA exam consists of 50 multiple choice questions to be completed in 1 hour.",
      },
    ],
  },
  ccba: {
    title: "CCBA Certification Training",
    description: "The Certification of Capability in Business Analysis (CCBA) is designed for professionals with 2-3 years of business analysis experience who want to validate their skills and advance their careers.",
    learningPoints: [
      "Advanced requirements elicitation techniques",
      "Complex stakeholder management",
      "Business process modeling",
      "Solution assessment and validation",
      "Strategic analysis methodologies",
    ],
    prerequisites: "You need 3,750 hours of business analysis work experience in the last 7 years, with 900 hours in two of the six BABOK® v3 Knowledge Areas, 21 hours of professional development, and two references.",
    whoCanDo: [
      "Junior Business Analysts",
      "Business Systems Analysts",
      "Requirements Analysts",
      "Process Analysts",
      "IT Analysts",
      "Project Coordinators",
    ],
    curriculum: [
      "CCBA Certification Overview",
      "Business Analysis Planning and Monitoring",
      "Elicitation and Collaboration Techniques",
      "Requirements Life Cycle Management",
      "Strategy Analysis",
      "Requirements Analysis and Design Definition",
      "Solution Evaluation",
      "CCBA Exam Strategies",
    ],
    features: [
      { icon: Clock, text: "28 hours" },
      { icon: Award, text: "28 CDU's" },
      { icon: BookOpen, text: "Exam Application Assistance" },
      { icon: Users, text: "BABOK Guide Version 3" },
      { icon: CheckCircle, text: "Case Studies" },
      { icon: TrendingUp, text: "24/7 Support" },
    ],
    faqs: [
      {
        question: "What experience is needed for CCBA?",
        answer: "You need 3,750 hours of business analysis experience in the last 7 years, with at least 900 hours in two of the six BABOK v3 Knowledge Areas.",
      },
      {
        question: "How is CCBA different from CBAP?",
        answer: "CCBA requires less experience (3,750 hours vs 7,500 hours) and is designed for mid-level professionals, while CBAP is for senior business analysts.",
      },
    ],
  },
  "ccba-prep": {
    title: "CCBA Prep Course",
    description: "This intensive preparation course helps you get ready for the CCBA certification exam with focused practice tests, study materials, and expert guidance.",
    learningPoints: [
      "Exam strategies and time management",
      "Practice with real exam scenarios",
      "Review of all BABOK knowledge areas",
      "Understanding exam question patterns",
      "Confidence building exercises",
    ],
    prerequisites: "You should be eligible for the CCBA exam and have completed the basic CCBA training or have equivalent knowledge.",
    whoCanDo: [
      "CCBA Exam Candidates",
      "Business Analysts preparing for CCBA",
    ],
    curriculum: [
      "Exam Overview and Strategies",
      "Knowledge Area Deep Dive",
      "Practice Test Session 1",
      "Practice Test Session 2",
      "Review and Q&A",
    ],
    features: [
      { icon: Clock, text: "16 hours" },
      { icon: Award, text: "Practice Tests" },
      { icon: BookOpen, text: "Study Guide" },
      { icon: TrendingUp, text: "24/7 Support" },
    ],
    faqs: [
      {
        question: "Is this a complete CCBA course?",
        answer: "No, this is a preparation course designed for those who have already completed CCBA training and are preparing for the exam.",
      },
    ],
  },
  // "genai-scrum-master": {
  //   title: "Gen AI for Scrum Masters",
  //   description: "Learn how to leverage Generative AI tools to enhance your Scrum Master role. This course covers AI-powered sprint planning, retrospective analysis, and team productivity optimization.",
  //   learningPoints: [
  //     "Using AI for sprint planning and estimation",
  //     "AI-powered retrospective analysis",
  //     "Automating Scrum artifacts with AI",
  //     "AI tools for team collaboration",
  //     "Predictive analytics for sprint success",
  //   ],
  //   prerequisites: "Basic understanding of Scrum framework and Scrum Master responsibilities. CSM or PSM certification preferred but not required.",
  //   whoCanDo: [
  //     "Scrum Masters",
  //     "Agile Coaches",
  //     "Team Leads",
  //     "Project Managers",
  //   ],
  //   curriculum: [
  //     "Introduction to Gen AI in Agile",
  //     "AI Tools for Sprint Planning",
  //     "Automating Daily Standups",
  //     "AI-Powered Retrospectives",
  //     "Predictive Analytics for Sprints",
  //     "AI for Team Productivity",
  //     "Hands-on AI Tool Workshop",
  //   ],
  //   features: [
  //     { icon: Clock, text: "16 hours" },
  //     { icon: Award, text: "Certificate" },
  //     { icon: BookOpen, text: "AI Tool Access" },
  //     { icon: TrendingUp, text: "24/7 Support" },
  //   ],
  //   faqs: [
  //     {
  //       question: "Do I need AI experience?",
  //       answer: "No prior AI experience is needed. We cover the fundamentals and practical applications for Scrum Masters.",
  //     },
  //   ],
  // },
  // "genai-project-managers": {
  //   title: "Gen AI for Project Managers",
  //   description: "Master the use of Generative AI to streamline project management workflows, automate reporting, and enhance decision-making in complex projects.",
  //   learningPoints: [
  //     "AI-powered project planning and scheduling",
  //     "Automated risk assessment with AI",
  //     "AI tools for stakeholder communication",
  //     "Predictive project analytics",
  //     "AI-driven resource optimization",
  //   ],
  //   prerequisites: "Project management experience required. PMP or PRINCE2 certification preferred.",
  //   whoCanDo: [
  //     "Project Managers",
  //     "Program Managers",
  //     "PMO Directors",
  //     "Senior Project Coordinators",
  //   ],
  //   curriculum: [
  //     "Gen AI Fundamentals for PM",
  //     "AI in Project Planning",
  //     "Risk Management with AI",
  //     "AI-Powered Reporting",
  //     "Resource Optimization",
  //     "Stakeholder Management with AI",
  //     "Practical AI Tools Workshop",
  //   ],
  //   features: [
  //     { icon: Clock, text: "20 hours" },
  //     { icon: Award, text: "Certificate" },
  //     { icon: BookOpen, text: "AI Tool Access" },
  //     { icon: TrendingUp, text: "24/7 Support" },
  //   ],
  //   faqs: [
  //     {
  //       question: "Which AI tools will be covered?",
  //       answer: "We cover ChatGPT, Microsoft Copilot, and specialized PM AI tools for planning, reporting, and risk analysis.",
  //     },
  //   ],
  // },
  // "genai-product-owner": {
  //   title: "Gen AI for Product Owners",
  //   description: "Learn to leverage AI for product backlog management, user story generation, and data-driven product decisions.",
  //   learningPoints: [
  //     "AI-assisted backlog prioritization",
  //     "Generating user stories with AI",
  //     "Market analysis using AI tools",
  //     "AI for customer feedback analysis",
  //     "Product roadmap optimization",
  //   ],
  //   prerequisites: "Product Owner experience or CSPO/PSPO certification recommended.",
  //   whoCanDo: [
  //     "Product Owners",
  //     "Product Managers",
  //     "Business Analysts",
  //     "UX Researchers",
  //   ],
  //   curriculum: [
  //     "AI in Product Management",
  //     "Backlog Management with AI",
  //     "User Story Generation",
  //     "Customer Insights with AI",
  //     "Roadmap Planning",
  //     "AI Tools Workshop",
  //   ],
  //   features: [
  //     { icon: Clock, text: "16 hours" },
  //     { icon: Award, text: "Certificate" },
  //     { icon: BookOpen, text: "AI Tool Access" },
  //     { icon: TrendingUp, text: "24/7 Support" },
  //   ],
  //   faqs: [],
  // },
  // "genai-business-analysts": {
  //   title: "Gen AI for Business Analysts",
  //   description: "Transform your business analysis practice with AI-powered requirements gathering, documentation automation, and stakeholder analysis.",
  //   learningPoints: [
  //     "AI for requirements elicitation",
  //     "Automated documentation with AI",
  //     "Process modeling using AI",
  //     "Data analysis with AI tools",
  //     "AI-powered stakeholder mapping",
  //   ],
  //   prerequisites: "Business analysis experience recommended. ECBA/CCBA/CBAP helpful but not required.",
  //   whoCanDo: [
  //     "Business Analysts",
  //     "Systems Analysts",
  //     "Data Analysts",
  //     "Requirements Analysts",
  //   ],
  //   curriculum: [
  //     "AI Fundamentals for BAs",
  //     "Requirements with AI",
  //     "Documentation Automation",
  //     "Process Modeling with AI",
  //     "Data Analysis Tools",
  //     "Practical Workshop",
  //   ],
  //   features: [
  //     { icon: Clock, text: "16 hours" },
  //     { icon: Award, text: "Certificate" },
  //     { icon: BookOpen, text: "AI Tool Access" },
  //     { icon: TrendingUp, text: "24/7 Support" },
  //   ],
  //   faqs: [],
  // },
  // "genai-interview-prep": {
  //   title: "Gen AI Interview Prep for Scrum Masters",
  //   description: "Prepare for Scrum Master interviews with AI-powered mock interviews, resume optimization, and industry insights.",
  //   learningPoints: [
  //     "AI-powered mock interviews",
  //     "Resume optimization with AI",
  //     "Common interview questions",
  //     "Behavioral interview preparation",
  //     "Salary negotiation strategies",
  //   ],
  //   prerequisites: "Scrum Master knowledge required. Certification helpful.",
  //   whoCanDo: [
  //     "Aspiring Scrum Masters",
  //     "Job Seekers",
  //     "Career Changers",
  //   ],
  //   curriculum: [
  //     "Interview Fundamentals",
  //     "AI Mock Interview Sessions",
  //     "Resume Building with AI",
  //     "Behavioral Questions",
  //     "Technical Questions",
  //     "Negotiation Tips",
  //   ],
  //   features: [
  //     { icon: Clock, text: "8 hours" },
  //     { icon: Award, text: "Certificate" },
  //     { icon: BookOpen, text: "Interview Guide" },
  //     { icon: TrendingUp, text: "24/7 Support" },
  //   ],
  //   faqs: [],
  // },
  // "agile-project-management": {
  //   title: "Agile Project Management",
  //   description: "Master agile principles and practices for effective project delivery. This comprehensive course covers Scrum, Kanban, Lean, and hybrid methodologies to help you lead agile transformations and deliver value faster.",
  //   learningPoints: [
  //     "Understanding agile principles and values",
  //     "Implementing Scrum framework",
  //     "Kanban and Lean methodologies",
  //     "Hybrid project management approaches",
  //     "Agile team leadership and coaching",
  //     "Continuous improvement practices",
  //   ],
  //   prerequisites: "Basic project management experience recommended. No prior agile experience required.",
  //   whoCanDo: [
  //     "Project Managers",
  //     "Team Leads",
  //     "Scrum Masters",
  //     "Product Owners",
  //     "Agile Coaches",
  //     "Development Team Members",
  //   ],
  //   curriculum: [
  //     "Introduction to Agile",
  //     "Agile Manifesto and Principles",
  //     "Scrum Framework Deep Dive",
  //     "Sprint Planning and Execution",
  //     "Kanban Fundamentals",
  //     "Lean Principles",
  //     "Hybrid Methodologies",
  //     "Agile Metrics and KPIs",
  //     "Scaling Agile",
  //     "Agile Transformation",
  //     "Leadership in Agile Teams",
  //     "Continuous Improvement",
  //   ],
  //   features: [
  //     { icon: Clock, text: "24 hours" },
  //     { icon: Award, text: "Certificate" },
  //     { icon: BookOpen, text: "Comprehensive Guide" },
  //     { icon: Users, text: "Interactive Sessions" },
  //     { icon: CheckCircle, text: "Case Studies" },
  //     { icon: TrendingUp, text: "24/7 Support" },
  //   ],
  //   faqs: [
  //     {
  //       question: "Is this course suitable for beginners?",
  //       answer: "Yes, this course is designed for both beginners and experienced professionals. We start with fundamentals and progressively cover advanced topics.",
  //     },
  //     {
  //       question: "What agile frameworks are covered?",
  //       answer: "The course covers Scrum, Kanban, Lean, XP (Extreme Programming), and hybrid approaches to give you a comprehensive understanding of agile methodologies.",
  //     },
  //     {
  //       question: "Will I receive a certificate?",
  //       answer: "Yes, upon successful completion of the course and assessments, you will receive a professional certificate of completion.",
  //     },
  //   ],
  // },
  pmp: {
    title: "PMP Certification Training",
    description: "Project Management Professional (PMI-PMP)® has shaped thousands of professionals globally and is a workforce skill in high demand. PMI's Project Management Professional (PMP)® credential is the most important industry-recognized certification for project managers. Globally recognized and demanded, PMP® certification demonstrates that you have the experience, education and competency to lead and direct projects.",
    learningPoints: [
      "Terminologies and concepts",
      "Learn and practice project management best practices",
      "Manage your stakeholders professionally",
      "Problem solving",
      "Project cost estimating",
      "Leadership",
      "Full prep for exam",
    ],
    prerequisites: "PMP® Certification Requirements: Either (1) Four-year degree with 36 months leading projects, or (2) High school diploma with 60 months leading projects. Plus 35 hours of project management education.",
    whoCanDo: [
      "Project Managers",
      "Team Leads",
      "Program Managers",
      "Project Coordinators",
      "PMO Managers",
    ],
    examFormat: {
      questions: "180",
      type: "Multiple choice, multiple responses, matching, hotspot, and limited fill-in-the-blank",
      duration: "230 minutes",
      details: "The exam tests knowledge across predictive, agile, and hybrid approaches to project management.",
    },
    curriculum: [
      {
        title: "Business Environment",
        items: [
          "Aligning with Organizational Trends and Global Strategy",
          "Project benefits and business value",
          "Organizational Culture and Change Management",
          "Project Governance",
          "Project Compliance",
          "Summary",
          "Assessment",
        ],
      },
      {
        title: "Starting The Project",
        items: [
          "Determine Appropriate Project Methodology/Methods And Practices",
          "Plan And Manage Scope",
          "Plan And Manage Budget And Resources",
          "Plan And Manage Schedule",
          "Plan And Manage Quality Of Products And Deliverables",
          "Integrate Project Planning Activities",
          "Plan And Manage Procurement",
          "Establish Project Governance Structure",
          "Plan And Manage Project/Phase Closure",
        ],
      },
      {
        title: "Plan the Project",
        items: [
          "Project Planning",
          "Scope and Schedule Management",
          "Cost and Quality Management",
          "Resource",
          "Procurement Management",
          "Integration",
          "Summary",
          "Assessment",
        ],
      },
      {
        title: "Lead the Project Team",
        items: [
          "Craft Your Leadership Skills",
          "Create a Collaborative Project Team Environment",
          "Empower the Team",
          "Support Team Member Performance",
          "Communicate and Collaborate with Stakeholders",
          "Training, Coaching and Mentoring",
          "Manage Conflicts",
          "Summary",
          "Assessment",
        ],
      },
      {
        title: "Support the Project Team Performance",
        items: [
          "Implement On-Going Improvements",
          "Support Performance",
          "Evaluate Project Progress",
          "Manage Issues and Impediments",
          "Manage Changes",
        ],
      },
      {
        title: "Close Project / Phase",
        items: [
          "Project / Phase Closure",
          "Benefits Realization",
          "Knowledge Transfer",
          "Summary",
          "Assessment",
        ],
      },
    ],
    features: [
      { icon: Clock, text: "36 Hours" },
      { icon: BookOpen, text: "35 Contact Hours" },
      { icon: Award, text: "Exam Application Assistance" },
      { icon: Users, text: "Latest PMBOK Guide" },
      { icon: CheckCircle, text: "600+ Practice Questions" },
      { icon: TrendingUp, text: "24/7 Support" },
    ],
    faqs: [
      {
        question: "What are the educational prerequisites must have to be eligible for PMP Exam?",
        answer: "The candidate should have attended at least 35 hours of classroom training on Project Management.",
      },
      {
        question: "What is the format of the PMP exam?",
        answer: "The certification exam for PMP consists 180 multiple-choice questions. The time allotted to complete the exam is 230 minutes.",
      },
      {
        question: "What score is required to pass the PMP Exam?",
        answer: "PMI has decided to no more publish passing scores for its exams and has also removed all quantitative elements from the post-exam review for test candidates. The passing score is estimated inside a range between 61% and 75%.",
      },
      {
        question: "How much does it cost to take exam?",
        answer: "It is highly recommended that you become PMI member prior to applying for the PMP exam to take the test. The membership fee is $129 + $10 for the first time. It is an annual fee and your application can be submitted online at www.pmi.org. If you are a PMI member, the exam fee is $405, for non-members, the exam fee is $575. Your PMI membership fee would help you to save and gain several privileges.",
      },
      {
        question: "What are the benefits of becoming PMP certified to an individual?",
        answer: "The benefits of being PMP certified are: Increases your value to your organization, Increases your marketability, Professional/personal recognition, Provides advancement in your field, Demonstrated ability to meet standardized and recognized project management body of knowledge, Raises customer confidence in you and your company's services.",
      },
    ],
  },


   pmipba: {
    title: "PMI PBA Certification Training",
    description: "Project Management Professional (PMI-PMP)® has shaped thousands of professionals globally and is a workforce skill in high demand. PMI's Project Management Professional (PMP)® credential is the most important industry-recognized certification for project managers. Globally recognized and demanded, PMP® certification demonstrates that you have the experience, education and competency to lead and direct projects.",
    learningPoints: [
      "Terminologies and concepts",
      "Learn and practice project management best practices",
      "Manage your stakeholders professionally",
      "Problem solving",
      "Project cost estimating",
      "Leadership",
      "Full prep for exam",
    ],
    prerequisites: "PMP® Certification Requirements: Either (1) Four-year degree with 36 months leading projects, or (2) High school diploma with 60 months leading projects. Plus 35 hours of project management education.",
    whoCanDo: [
      "Project Managers",
      "Team Leads",
      "Program Managers",
      "Project Coordinators",
      "PMO Managers",
    ],
    examFormat: {
      questions: "180",
      type: "Multiple choice, multiple responses, matching, hotspot, and limited fill-in-the-blank",
      duration: "230 minutes",
      details: "The exam tests knowledge across predictive, agile, and hybrid approaches to project management.",
    },
    curriculum: [
      "Introduction to PMP",
      "Project Management Framework",
      "Project Integration Management",
      "Project Scope Management",
      "Project Schedule Management",
      "Project Cost Management",
      "Project Quality Management",
      "Project Resource Management",
      "Project Communications Management",
      "Project Risk Management",
      "Project Procurement Management",
      "Project Stakeholder Management",
      "Agile and Hybrid Approaches",
    ],
    features: [
      { icon: Clock, text: "36 Hours" },
      { icon: BookOpen, text: "35 Contact Hours" },
      { icon: Award, text: "Exam Application Assistance" },
      { icon: Users, text: "Latest PMBOK Guide" },
      { icon: CheckCircle, text: "600+ Practice Questions" },
      { icon: TrendingUp, text: "24/7 Support" },
    ],
    faqs: [
      {
        question: "What are the prerequisites for PMP certification?",
        answer: "Either a four-year degree with 36 months of project leadership experience, or a high school diploma with 60 months of project leadership experience. Plus 35 hours of PM education.",
      },
      {
        question: "How long is PMP certification valid?",
        answer: "PMP certification is valid for 3 years. You need to earn 60 PDUs in each 3-year cycle to maintain it.",
      },
      {
        question: "What is the exam format?",
        answer: "The PMP exam has 180 questions to be completed in 230 minutes. It includes multiple choice, multiple responses, matching, hotspot, and fill-in-the-blank questions.",
      },
    ],
  },

  "pmi-acp": {
    title: "PMI-ACP® Certification Training",
    description: "The PMI Agile Certified Practitioner (PMI-ACP)® certification demonstrates your knowledge of agile principles and your skill with agile techniques. It's the fastest-growing PMI certification and validates your ability to work in agile environments. This certification covers a variety of agile approaches including Scrum, Kanban, Lean, extreme programming (XP), and test-driven development (TDD).",
    learningPoints: [
      "Agile principles and methodologies",
      "Scrum, Kanban, and Lean practices",
      "Agile planning and estimation techniques",
      "Stakeholder engagement in agile projects",
      "Agile team dynamics and collaboration",
      "Continuous improvement practices",
      "Full preparation for PMI-ACP exam",
    ],
    prerequisites: "PMI-ACP® Certification Requirements: Either (1) Secondary degree with 21 contact hours of training in agile practices, 12 months of general project experience within the last 5 years, and 8 months of agile project experience within the last 3 years, OR (2) Four-year degree with 21 contact hours of training in agile practices, 12 months of general project experience within the last 5 years, and 8 months of agile project experience within the last 3 years.",
    whoCanDo: [
      "Agile Project Managers",
      "Scrum Masters",
      "Product Owners",
      "Agile Coaches",
      "Team Leads",
      "Project Managers transitioning to Agile",
    ],
    examFormat: {
      questions: "120",
      type: "Multiple choice questions",
      duration: "180 minutes",
      details: "The exam tests knowledge of agile principles, tools, and techniques across various agile methodologies including Scrum, Kanban, Lean, XP, and TDD.",
    },
    curriculum: [
      "Introduction to Agile and PMI-ACP",
      "Agile Principles and Mindset",
      "Value-Driven Delivery",
      "Stakeholder Engagement",
      "Team Performance",
      "Adaptive Planning",
      "Problem Detection and Resolution",
      "Continuous Improvement",
      "Agile Methodologies: Scrum, Kanban, XP",
      "Agile Tools and Techniques",
      "Agile Estimation and Planning",
      "Agile Risk Management",
      "Exam Preparation and Practice",
    ],
    features: [
      { icon: Clock, text: "21 Contact Hours" },
      { icon: BookOpen, text: "Agile Practice Guide" },
      { icon: Award, text: "Exam Application Assistance" },
      { icon: Users, text: "Agile Tools & Techniques" },
      { icon: CheckCircle, text: "500+ Practice Questions" },
      { icon: TrendingUp, text: "24/7 Support" },
    ],
    faqs: [
      {
        question: "What are the prerequisites for PMI-ACP certification?",
        answer: "You need either a secondary degree or four-year degree, 21 contact hours of training in agile practices, 12 months of general project experience within the last 5 years, and 8 months of agile project experience within the last 3 years.",
      },
      {
        question: "How long is PMI-ACP certification valid?",
        answer: "PMI-ACP certification is valid for 3 years. You need to earn 30 PDUs in agile topics within each 3-year cycle to maintain your certification.",
      },
      {
        question: "What is the PMI-ACP exam format?",
        answer: "The PMI-ACP exam consists of 120 multiple choice questions to be completed in 180 minutes. The exam tests your knowledge of agile principles, tools, and techniques across various agile methodologies.",
      },
    ],
  },

  capm: {
    title: "CAPM® Certification Training",
    description: "The Certified Associate in Project Management (CAPM)® is an entry-level certification for project practitioners. Designed for those who are new to project management or want to demonstrate their commitment to the profession, CAPM® certification shows that you understand the fundamental knowledge, terminology, and processes of effective project management.",
    learningPoints: [
      "Project management fundamentals",
      "Project lifecycle and processes",
      "Project integration management",
      "Scope, schedule, and cost management",
      "Quality and resource management",
      "Risk and procurement management",
      "Stakeholder and communications management",
      "Full preparation for CAPM exam",
    ],
    prerequisites: "CAPM® Certification Requirements: Either (1) Secondary degree (high school diploma, associate's degree, or global equivalent) with 23 contact hours of project management education completed by the time you sit for the exam, OR (2) Secondary degree (high school diploma, associate's degree, or global equivalent) with 1,500 hours of project experience.",
    whoCanDo: [
      "Project Coordinators",
      "Entry-level Project Managers",
      "Team Members",
      "Students",
      "Career Changers",
      "Anyone new to project management",
    ],
    examFormat: {
      questions: "150",
      type: "Multiple choice questions",
      duration: "180 minutes",
      details: "The exam tests knowledge of project management fundamentals, processes, and terminology as defined in the PMBOK Guide.",
    },
    curriculum: [
      "Introduction to CAPM and Project Management",
      "Project Management Framework",
      "Project Life Cycle and Organization",
      "Project Integration Management",
      "Project Scope Management",
      "Project Schedule Management",
      "Project Cost Management",
      "Project Quality Management",
      "Project Resource Management",
      "Project Communications Management",
      "Project Risk Management",
      "Project Procurement Management",
      "Project Stakeholder Management",
      "Exam Preparation and Practice Tests",
    ],
    features: [
      { icon: Clock, text: "23 Contact Hours" },
      { icon: BookOpen, text: "PMBOK Guide" },
      { icon: Award, text: "Exam Application Assistance" },
      { icon: Users, text: "Project Management Fundamentals" },
      { icon: CheckCircle, text: "400+ Practice Questions" },
      { icon: TrendingUp, text: "24/7 Support" },
    ],
    faqs: [
      {
        question: "What are the prerequisites for CAPM certification?",
        answer: "You need either a secondary degree (high school diploma or equivalent) with 23 contact hours of project management education, OR a secondary degree with 1,500 hours of project experience.",
      },
      {
        question: "How long is CAPM certification valid?",
        answer: "CAPM certification is valid for 5 years. After 5 years, you can either retake the exam or upgrade to PMP certification if you meet the PMP requirements.",
      },
      {
        question: "What is the CAPM exam format?",
        answer: "The CAPM exam consists of 150 multiple choice questions to be completed in 180 minutes. The exam tests your knowledge of project management fundamentals, processes, and terminology.",
      },
    ],
  },
};

const defaultCourse: CourseData = {
  title: "Professional Certification Training",
  description: "Enhance your professional skills with our comprehensive certification training program designed by industry experts.",
  learningPoints: [
    "Core concepts and fundamentals",
    "Best practices and methodologies",
    "Real-world case studies",
    "Exam preparation strategies",
  ],
  prerequisites: "Basic understanding of the subject area. Prior experience helpful but not required.",
  whoCanDo: [
    "Working Professionals",
    "Career Changers",
    "Students",
  ],
  curriculum: [
    "Introduction",
    "Core Concepts",
    "Advanced Topics",
    "Exam Preparation",
  ],
  features: [
    { icon: Clock, text: "24 hours" },
    { icon: Award, text: "Certificate" },
    { icon: BookOpen, text: "Study Materials" },
    { icon: TrendingUp, text: "24/7 Support" },
  ],
  faqs: [],
};

export default function CourseDetails() {
  const [match, params] = useRoute("/courses/:id");
  const courseId = params?.id || "cbap";
  const { toast } = useToast();
  
  const course = coursesData[courseId] || defaultCourse;
  
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "faqs">("overview");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Course inquiry for: ${course.title}`,
          type: "course_inquiry",
        }),
      });
      if (response.ok) {
        toast({
          title: "Request Submitted Successfully!",
          description: "Thank you! Our advisor will contact you within 24 hours.",
          duration: 5000,
        });
        setFormData({ name: "", email: "", phone: "" });
      } else {
        toast({
          title: "Request Received",
          description: "Thank you for your interest! We will contact you shortly.",
          duration: 5000,
        });
        setFormData({ name: "", email: "", phone: "" });
      }
    } catch (error) {
      toast({
        title: "Request Received",
        description: "Thank you for your interest! We will contact you shortly.",
        duration: 5000,
      });
      setFormData({ name: "", email: "", phone: "" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="mt-20 flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            {/* LEFT SIDE - Course Content */}
            <div>
              {/* Hero Image */}
              <div className="relative w-full h-80 rounded-xl overflow-hidden mb-8 shadow-lg">
                <img
                  src={heroImg}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  data-testid="img-course-hero"
                />
              </div>

              {/* Course Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground" data-testid="text-course-title">
                {course.title}
              </h1>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-3 font-semibold transition-all duration-300 rounded-t-lg ${
                    activeTab === "overview"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-foreground hover:bg-gray-200"
                  }`}
                  data-testid="tab-overview"
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("curriculum")}
                  className={`px-6 py-3 font-semibold transition-all duration-300 rounded-t-lg ${
                    activeTab === "curriculum"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-foreground hover:bg-gray-200"
                  }`}
                  data-testid="tab-curriculum"
                >
                  Curriculum
                </button>
                <button
                  onClick={() => setActiveTab("faqs")}
                  className={`px-6 py-3 font-semibold transition-all duration-300 rounded-t-lg ${
                    activeTab === "faqs"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-foreground hover:bg-gray-200"
                  }`}
                  data-testid="tab-faqs"
                >
                  FAQ's
                </button>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {course.description}
                    </p>

                    <h2 className="text-2xl font-bold mb-4 text-foreground">What will you learn?</h2>
                    <ul className="space-y-3 mb-8">
                      {course.learningPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <h2 className="text-2xl font-bold mb-4 text-foreground">Pre-requisites</h2>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {course.prerequisites}
                    </p>

                    {course.whoCanDo && course.whoCanDo.length > 0 && (
                      <>
                        <h2 className="text-2xl font-bold mb-4 text-foreground">Who can do {course.title}?</h2>
                        <div className="grid sm:grid-cols-2 gap-3 mb-8">
                          {course.whoCanDo.map((role, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                              <span className="text-muted-foreground">{role}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {course.examFormat && (
                      <>
                        <h2 className="text-2xl font-bold mb-4 text-foreground">Exam Format</h2>
                        <Card className="p-6 bg-gray-50 border-none shadow-sm mb-8">
                          <p className="text-muted-foreground mb-4">The certification exam pattern is as follows:</p>
                          <ul className="space-y-2 mb-4">
                            <li className="flex items-start gap-2">
                              <span className="font-medium text-foreground">Number of questions:</span>
                              <span className="text-muted-foreground">{course.examFormat.questions}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="font-medium text-foreground">Question type:</span>
                              <span className="text-muted-foreground">{course.examFormat.type}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="font-medium text-foreground">Duration:</span>
                              <span className="text-muted-foreground">{course.examFormat.duration}</span>
                            </li>
                          </ul>
                          <p className="text-muted-foreground text-sm">{course.examFormat.details}</p>
                        </Card>
                      </>
                    )}
                  </motion.div>
                )}

                {activeTab === "curriculum" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-foreground">Course Curriculum</h2>
                    {Array.isArray(course.curriculum) && course.curriculum.length > 0 && typeof course.curriculum[0] === 'object' && 'title' in course.curriculum[0] ? (
                      // New format with sections
                      <Accordion type="single" collapsible className="w-full">
                        {(course.curriculum as CurriculumSection[]).map((section, sectionIndex) => (
                          <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`} className="border-b border-gray-200">
                            <AccordionTrigger className="text-left font-semibold text-lg py-4 hover:no-underline">
                              {section.title}
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2 pl-4">
                                {section.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="flex items-start gap-3 py-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span className="text-gray-700">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      // Old format (flat list)
                      <div className="space-y-3">
                        {(course.curriculum as string[]).map((module, index) => (
                          <Card
                            key={index}
                            className="border-none overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                            data-testid={`module-${index}`}
                          >
                            <div className="px-6 py-4 flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                {index + 1}
                              </div>
                              <span className="font-medium text-gray-900">{module}</span>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "faqs" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
                    {course.faqs.length > 0 ? (
                      <div className="space-y-3">
                        {course.faqs.map((faq, index) => (
                          <Card
                            key={index}
                            className="border-none overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow"
                            data-testid={`faq-${index}`}
                          >
                            <button
                              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                              data-testid={`button-faq-${index}`}
                            >
                              <div className="flex items-center gap-4 flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                                  expandedFaq === index ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-700'
                                }`}>
                                  Q
                                </div>
                                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                              </div>
                              <ChevronDown
                                className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-2 ${
                                  expandedFaq === index ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            <AnimatePresence>
                              {expandedFaq === index && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="border-t border-gray-200 bg-gray-50"
                                >
                                  <div className="px-6 py-4">
                                    <div className="flex gap-3">
                                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
                                        A
                                      </div>
                                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">FAQs coming soon. Contact us for any questions.</p>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE - Sticky Sidebar */}
            <div className="lg:sticky lg:top-24 h-fit space-y-6">
              {/* Course Features Card */}
              <Card className="p-6 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.1)] border-none">
                <h3 className="text-xl font-bold mb-6 text-primary">
                  Course Features
                </h3>
                <div className="space-y-4">
                  {course.features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-secondary" />
                        <span className="text-gray-700 text-sm">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
                
                <Link href="/schedule">
                  <Button
                    className="w-full mt-6 bg-primary hover:bg-primary/90 text-white h-12"
                    data-testid="button-view-schedules"
                  >
                    View Schedules
                  </Button>
                </Link>
              </Card>

              {/* Talk to Advisor Card */}
              <Card className="p-6 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.1)] border-none">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Next Cohort starts in 2 Days</span>
                </div>
                <h3 className="text-xl font-bold mb-6 text-primary">
                  Talk to Our Advisor
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name*"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary"
                    data-testid="input-name"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary"
                    data-testid="input-email"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number*"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12 bg-gray-50 border-gray-200 focus:border-primary"
                    data-testid="input-phone"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white h-12"
                    data-testid="button-submit-advisor"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Talk to Our Advisor
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
