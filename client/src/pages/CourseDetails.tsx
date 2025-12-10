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
      {
        title: "Introduction to CBAP® Certification",
        items: [
          "Introduction to CBAP® Certification",
        ],
      },
      {
        title: "Introduction to BABOK® V3",
        items: [
          "Introduction to BABOK",
          "Business Analysis",
          "Competencies of a Business Analyst",
          "Techniques referred to by BABOK® V3",
          "Quiz",
        ],
      },
      {
        title: "Business Analysis Planning and Monitoring",
        items: [
          "Introduction to Business Analysis Planning and Monitoring",
          "Plan Stakeholder Engagement",
          "Plan Business Analysis Governance",
          "Plan Business Analysis Information Management",
          "Identify Business Analysis",
          "Quiz",
        ],
      },
      {
        title: "Elicitation and Collaboration",
        items: [
          "Introduction to Elicitation and Collaboration",
          "Prepare For Elicitation",
          "Conduct Elicitation",
          "Confirm Elicitation Results",
          "Communicate Business Analysis Information",
          "Manage stakeholder collaboration",
          "Quiz",
        ],
      },
      {
        title: "Requirements Life Cycle Management",
        items: [
          "Introduction to Requirements Life Cycle Management",
          "Trace Requirements",
          "Maintain Requirements",
          "Prioritize Requirements",
          "Assess Requirements Changes",
          "Approve Requirements",
          "Quiz",
        ],
      },
      {
        title: "Strategy Analysis",
        items: [
          "Introduction to Strategy Analysis",
          "Analyze Current State",
          "Define Future State",
          "Assess Risks",
          "Define Change Strategy",
          "Quiz",
        ],
      },
      {
        title: "Requirements Analysis and Design Definition",
        items: [
          "Introduction to Requirements Analysis and Design Definition",
          "Specify and Model Requirements",
          "Verify Requirements",
          "Validate Requirements",
          "Define Requirements Architecture",
          "Define Design Options",
          "Analyze Potential Value and Recommend Solution",
          "Quiz",
        ],
      },
      {
        title: "Solution Evaluation",
        items: [
          "Introduction to Solution Evaluation",
          "Measure Solution Performance",
          "Analyze Performance Measures",
          "Assess Solution Limitations",
          "Assess Enterprise Limitations",
          "Recommend Actions to Increase Solution Value",
          "Quiz",
        ],
      },
      {
        title: "Introduction to Agile Perspective",
        items: [
          "Change Scope",
          "Business Analysis Scope",
          "Approaches and techniques",
          "Business Analysis Planning and Monitoring",
          "Elicitation and Collaboration",
          "Requirements life cycle management",
          "Strategy Analysis",
          "Requirement analysis and design definition",
          "Solution evaluation",
          "Quiz",
        ],
      },
      {
        title: "Business Intelligence Perspective",
        items: [
          "Introduction to Business Intelligence Perspective",
          "Change Scope",
          "Business Analysis Scope",
          "Methodologies And Approaches",
          "Underlying Competencies",
          "Impact On Knowledge Areas",
          "Quiz",
        ],
      },
      {
        title: "Information Technology Perspective",
        items: [
          "Introduction to Information Technology Perspective",
          "Change Scope",
          "Business Analysis Scope",
          "Methodologies",
          "Underlying Competencies",
          "Impact on Knowledge Areas",
          "Quiz",
        ],
      },
      {
        title: "Business Architecture Perspective",
        items: [
          "Introduction to Business Architecture Perspective",
          "Change Scope",
          "Business Analysis Scope",
          "Business Architecture Reference Models",
          "Underlying Competencies",
          "Impact On Knowledge Areas",
          "Quiz",
        ],
      },
      {
        title: "Business Process Management Perspective",
        items: [
          "Introduction to Business Process Management Perspective",
          "Change Scope",
          "Business Analysis Scope",
          "Frameworks, Methodologies, and Techniques",
          "Underlying Competencies",
          "Impact on Knowledge Areas",
          "Quiz",
        ],
      },
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
        question: "What is the CBAP exam format?",
        answer: "The CBAP certification exam pattern is as follows: Number of questions: 120. Question type: Multiple choice questions. Duration: 3.5 hours. Formulated from the BABOK Guide v3, exam contains both scenario and case study-based questions that are designed to test your ability to apply the BA concepts.",
      },
      {
        question: "How long is the CBAP certification valid?",
        answer: "CBAP certification is valid for three years. To maintain your certification, you need to earn 60 Continuing Development Units (CDUs) within the three-year cycle.",
      },
      {
        question: "Is this training aligned with BABOK v3?",
        answer: "Yes, our CBAP certification training is fully aligned with the BABOK® Guide v3, covering all six knowledge areas and perspectives required for the certification exam.",
      },
      {
        question: "Who can attend CBAP Certification Training?",
        answer: "The CBAP is ideal for Business Architects, Business Systems Analysts, Data Analysts, Enterprise Analysts, Management Consultants, Process Analysts, Product Managers, Product Owners, Requirements Engineers, and Systems Analysts.",
      },
      {
        question: "What will you learn in CBAP Certification Training?",
        answer: "You will learn planning and monitoring business analysis processes, eliciting, analysing, and managing requirements, managing the entire project lifecycle, conducting strategic analysis for business solutions, and evaluating and optimising solutions.",
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
        answer: "Requires 1 hour 15 minutes for 50 multiple choice questions",
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
      {
        title: "CCBA Certification Overview",
        items: [
          "CCBA Certification Overview",
        ],
      },
      {
        title: "Introduction to BABOK® V3",
        items: [
          "Introduction to BABOK",
          "Business Analysis",
          "Competencies of a Business Analyst",
          "Techniques referred to by BABOK® V3",
          "Quiz",
        ],
      },
      {
        title: "Business Analysis Planning and Monitoring",
        items: [
          "Introduction to Business Analysis Planning and Monitoring",
          "Plan Stakeholder Engagement",
          "Plan Business Analysis Governance",
          "Plan Business Analysis Information Management",
          "Identify Business Analysis",
          "Quiz",
        ],
      },
      {
        title: "Elicitation and Collaboration",
        items: [
          "Introduction to Elicitation and Collaboration",
          "Prepare For Elicitation",
          "Conduct Elicitation",
          "Confirm Elicitation Results",
          "Communicate Business Analysis Information",
          "Manage stakeholder collaboration",
          "Quiz",
        ],
      },
      {
        title: "Requirements Life Cycle Management",
        items: [
          "Introduction to Requirements Life Cycle Management",
          "Trace Requirements",
          "Maintain Requirements",
          "Prioritize Requirements",
          "Assess Requirements Changes",
          "Approve Requirements",
          "Quiz",
        ],
      },
      {
        title: "Strategy Analysis",
        items: [
          "Introduction to Strategy Analysis",
          "Analyze Current State",
          "Define Future State",
          "Assess Risks",
          "Define Change Strategy",
          "Quiz",
        ],
      },
      {
        title: "Requirements Analysis and Design Definition",
        items: [
          "Introduction to Requirements Analysis and Design Definition",
          "Specify and Model Requirements",
          "Verify Requirements",
          "Validate Requirements",
          "Define Requirements Architecture",
          "Define Design Options",
          "Analyze Potential Value and Recommend Solution",
          "Quiz",
        ],
      },
      {
        title: "Solution Evaluation",
        items: [
          "Introduction to Solution Evaluation",
          "Measure Solution Performance",
          "Analyze Performance Measures",
          "Assess Solution Limitations",
          "Assess Enterprise Limitations",
          "Recommend Actions to Increase Solution Value",
          "Quiz",
        ],
      },
      {
        title: "Techniques and Competencies",
        items: [
          "Business Analysis Techniques",
          "Underlying Competencies",
          "Analytical Thinking and Problem Solving",
          "Behavioral Characteristics",
          "Business Knowledge",
          "Communication Skills",
          "Interaction Skills",
          "Software Applications",
          "Quiz",
        ],
      },
    ],
    features: [
      { icon: Clock, text: "28 hours" },
      { icon: Award, text: "21 PDU's" },
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
    description: "Business Analysis has become an important component of Project Management. One of the top three causes of project failure is inaccurate gathering of project requirements. Therefore, performing this function properly is of critical value for project managers. Business analysis, when performed in a planned manner, reduces overall cost for the project. PMI-PBA training will help managers by actively performing the process of gathering and elicitation of requirements. Business analysts can help the project come to a definite understanding of what is needed from the solution to be successful. Audience: Project managers or program managers who manage requirements in a project can benefit from this PMI-PBA course greatly.",
    learningPoints: [
      "Understand the problems and goals of the enterprise",
      "Analyse needs and solutions",
      "Develop change strategies",
      "Drive change",
      "Facilitate stakeholder collaboration",
    ],
    prerequisites: "Eligibility for PMI Professional in Business Analysis Certification Program: Must have a Secondary degree Must have at least 60 months of work experience in business analysis Must have 35 contact hours of education in the field of business analysis OR Must hold a bachelor's degree or the global equivalent Must have at least 36 months of work experience in business analysis Must have 35 contact hours of education certificate in business analysis",
    whoCanDo: [
      "Project managers",
      "Asst Project managers",
      "Project coordinators",
      "Project leaders",
      "Senior project managers",
      "Team leaders",
      "Product / Program Managers",
      "Project Sponsors",
      "Project team members seeking the PMP certification",
      "PMO team members",
      "Senior Executives",
      "Project Coordinator",
    ],
    examFormat: {
      questions: "200",
      type: "Multiple Choice Questions",
      duration: "4 hours",
      details: "Exam format – Multiple Choice Questions. Number of questions - 200. Exam duration – 4 hours.",
    },
    curriculum: [
      {
        title: "Module 1: INTRODUCTION",
        items: [
          "What is Business Analysis?",
          "Who Performs Business Analysis?",
          "Definition of Requirement",
        ],
      },
      {
        title: "Module 2: NEEDS ASSESSMENT",
        items: [
          "Overview of this Section",
          "Why Perform Needs Assessments",
          "Identify Problem or Opportunity",
          "Assess Current State of the Organization",
          "Recommend Action to Address Business Needs",
          "Assemble the Business Case",
        ],
      },
      {
        title: "Module 3: BUSINESS ANALYSIS PLANNING",
        items: [
          "Overview of this Section",
          "The Importance of Business Analysis Planning",
          "Conduct or Refine the Stakeholder Analysis",
          "Create the Business Analysis Plan",
          "Plan the Business Analysis Work",
        ],
      },
      {
        title: "Module 4: REQUIREMENTS ELICITATION AND ANALYSIS",
        items: [
          "Purpose of this Section",
          "What it means to Elicit Information",
          "Plan for Elicitation",
          "Prepare for Elicitation",
        ],
      },
      {
        title: "Module 5: TRACEABILITY AND MONITORING",
        items: [
          "Overview of this Section",
          "Traceability",
          "Relationships and Dependencies",
          "Approving Requirements",
          "Base lining Approved Requirements",
          "Monitoring Requirements Using a Traceability Matrix",
          "The Requirements Life Cycle",
          "Managing Changes to Requirements",
        ],
      },
      {
        title: "Module 6: SOLUTION EVALUATION",
        items: [
          "Overview of this Section",
          "Purpose of Solution Evaluation",
          "Recommended Mindset for Evaluation",
          "Plan for Evaluation of the Solution",
          "Determine What to Evaluate",
          "When and How to Validate Solution Results",
          "Evaluate Acceptance Criteria and Address Defects",
          "Facilitate the Go/No-Go Decision",
          "Obtain Signoff of the Solution",
          "Evaluate the Long-Term Performance of the Solution",
          "Solution Replacement/Phase out",
        ],
      },
    ],
    features: [
      { icon: Clock, text: "35 Hours" },
      { icon: BookOpen, text: "35 Contact Hours" },
      { icon: Award, text: "Course Materials" },
      { icon: Users, text: "Case Studies" },
      { icon: CheckCircle, text: "Exam Tips and Techniques" },
      { icon: TrendingUp, text: "24/7 support" },
    ],
    faqs: [
      {
        question: "What is business analysis?",
        answer: "Business analysis refers to the knowledge, tasks, and techniques required to identify business needs and determine solutions to various business problems.",
      },
      {
        question: "When Will I Receive The PMI Professional In Business Analysis Certificate?",
        answer: "On completion of the PMI PBA training course, the candidate will receive a course completion certificate from Learners Ink and on clearing the exam, the PMI-Professional in Business Analysis certification from Project Management Institute is awarded.",
      },
      {
        question: "What Is The Rate Of Passing For PMI PBA Training Offered By Learners Ink?",
        answer: "The average pass rate of candidates who took up Learners Ink PMI PBA training programs is 98.6 %.",
      },
      {
        question: "Will this training help me to get a better job with a high salary package?",
        answer: "Individuals who hold Business Analysis skills get higher ranks in companies and get paid more than an average Project Management Professional.",
      },
      {
        question: "What will I learn in the PMI Professional in Business Analysis (PMI-PBA) Training?",
        answer: "PMI Professional in Business Analysis (PMI-PBA) Training will provide you with an in-depth understanding of business analysis concepts. During this training, you will gain a comprehensive knowledge of different domains, including various tasks to learn to establish a roadmap for delivering expected solutions and outcomes.",
      },
      {
        question: "Can you customise training material according to our company requirements?",
        answer: "Yes, we have subject matter experts who will work according to your company requirements.",
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
      {
        title: "Domain 1: Mindset (28%)",
        items: [
          "Experiment Early",
          "Build early product increments for validation",
          "Foster innovation, learning, growth environments",
          "Embrace Agile Mindset",
          "Apply agile values and principles",
          "Utilize complexity models (Cynefin, Stacey Matrix, CAS)",
          "Use agile suitability tools",
          "Adapt models to context (use case, team, project, organization)",
          "Apply Systems Thinking",
          "Identify interdependencies",
          "Analyze system-level impacts",
          "Build High-Performing Teams",
          "Establish team ground rules and agreements",
          "Promote collaboration and shared vision",
          "Leverage retrospectives to evolve practices",
          "Facilitate Cross-Team Coordination",
          "Tailor coordination techniques across teams",
          "Align dependencies and managing integration",
        ],
      },
      {
        title: "Domain 2: Leadership (25%)",
        items: [
          "Agile leadership principles and practices",
          "Servant leadership in agile environments",
          "Coaching and mentoring agile teams",
          "Conflict resolution and negotiation",
          "Stakeholder management and engagement",
          "Building trust and psychological safety",
        ],
      },
      {
        title: "Domain 3: Product (19%)",
        items: [
          "Product vision and roadmap planning",
          "Backlog management and prioritization",
          "User story creation and refinement",
          "Product increment planning",
          "Value delivery and optimization",
          "Customer collaboration and feedback",
        ],
      },
      {
        title: "Domain 4: Delivery (28%)",
        items: [
          "Agile planning and estimation",
          "Iteration and sprint execution",
          "Agile ceremonies and practices",
          "Continuous integration and delivery",
          "Quality assurance in agile",
          "Risk management in agile projects",
          "Metrics and reporting",
        ],
      },
    ],
    features: [
      { icon: Clock, text: "4-Day interactive instructor-led training" },
      { icon: Users, text: "PMI-ACP Expert trainers across the globe" },
      { icon: BookOpen, text: "PMI-ACP course material provided by PMI" },
      { icon: CheckCircle, text: "Case Studies with real-world examples" },
      { icon: Award, text: "28 PDU's" },
      { icon: TrendingUp, text: "After training in coaching for real-world application" },
      { icon: CheckCircle, text: "Robust CCR program to maintain your PMI-ACP certification" },
    ],
    faqs: [
      {
        question: "What are the prerequisites for PMI-ACP certification?",
        answer: "To apply for the PMI Agile Certified Practitioner (PMI-ACP) certification, you must meet the following requirements: Educational background: A secondary diploma (high school, GED, or global equivalent). General project experience: 2,000 hours (12 months) working on project teams within the last 5 years. A current PMP® or PgMP® counts toward this requirement. Agile project experience: 1,500 hours (8 months) working on agile project teams within the last 3 years. Agile training: 21–28 contact hours in agile practices, frameworks, and methodologies (21 hours accepted until March 2025; after that, full 28 hours required).",
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
    description: "Certified Associate in Project Management (CAPM) is a credential from Project Management Institute (PMI). It is a valuable entry-level certification for project practitioners. Designed for those with little or no project experience, the CAPM® demonstrates your understanding of the fundamental knowledge, terminology and processes of effective project management. This credential is essential for entry-level project managers. Individuals who carry the CAPM designation after their name enjoy a high level of credibility from PMP® credential holders, project managers, employers and peers.",
    learningPoints: [
      "Understand the role of the project manager in driving innovation",
      "Demonstrate the use of standard project management tools and techniques",
      "Analyze and plan large and small projects",
      "Produce project scope",
      "Interrelate project scheduling, planning, and prioritization",
    ],
    prerequisites: "Prerequisites for the CAPM certification: Secondary degree (high school diploma, associate's degree or the global equivalent) 1,500 hours of professional project experience OR Secondary diploma (high school diploma or the global equivalent) 23 hours of formal project management training",
    whoCanDo: [
      "Associate Project managers",
      "Project Executive",
      "Project Leaders",
      "Project Analyst",
      "Project Coordinators",
      "Project management job seekers",
      "Project management experience holders",
      "Want to apply for PMP certification in the future",
    ],
    examFormat: {
      questions: "150",
      type: "Multiple choice questions",
      duration: "180 minutes (3 hours)",
      details: "The CAPM® exam is a 3-hour multiple choice paper consisting of 150 questions. 135 are scored and the other 15 are pre-test, and will not be scored.",
    },
    curriculum: [
      {
        title: "Introduction to Project Management",
        items: [
          "Understand the five project management process groups and the processes within each group",
          "Recognize the relationships among project, program, portfolio, and operational management",
          "Define a typical project lifecycle",
          "Understand the function and importance of tailoring for different projects",
        ],
      },
      {
        title: "Project Environment",
        items: [
          "Identify the factors and assets that may impact the outcome of a project",
          "Distinguish between organizational systems",
          "Understand the purpose and activities of a Project Management Office",
          "Recognize the hierarchy of projects, programs and portfolios",
        ],
      },
      {
        title: "State the primary functions of a project manager",
        items: [
          "Understand a project manager's sphere of influence",
          "Identify the major elements included in the PMI triangle",
          "Recognize the difference between leadership and management",
        ],
      },
      {
        title: "Project Integration Management",
        items: [
          "Understand the seven project management processes in the project integration management knowledge area",
          "Identify the input, tools, techniques and outputs defined in the seven processes in project integration management",
          "Understand the purpose of project integration management and the project manager's role within it",
          "Identify concepts and procedures related to project change management",
          "Identify tailoring consideration in project integration management and recognize key documents",
          "Identify methods for project integration and knowledge management",
        ],
      },
      {
        title: "Project Scope Management",
        items: [
          "Understand the six project management processes in the project scope management knowledge area",
          "Identify the Input, tools, techniques and outputs defined in the six processes in project scope management",
          "Identify key concepts and tailoring consideration for project scope management, and key roles in scope management",
          "Identify the purpose and elements of a Work Breakdown Structure (WBS) for both Product and Project scope",
          "Understand project scope management for agile/adaptive projects, including the use of prototypes",
        ],
      },
      {
        title: "Project Schedule Management",
        items: [
          "Define the six project management processes in the project schedule management knowledge area",
          "Identify the Input, tools, techniques and outputs defined in the six processes in project schedule management",
          "Solve simple network diagrams problems and perform basic scheduling calculations",
          "Identify considerations for agile/adaptive environments in project schedule management",
        ],
      },
      {
        title: "Project Cost Management",
        items: [
          "Understand the four project management processes in the project cost management knowledge area",
          "Identify the Input, tools, techniques and outputs defined in the four processes in project cost management",
          "Identify key concepts in project cost management, including tailoring and special considerations for agile/adaptive environments",
          "Understand and apply basic forecasting and earned value methods for project cost management",
        ],
      },
      {
        title: "Project Quality Management",
        items: [
          "Understand the three project management processes in the project quality management knowledge area",
          "Identify the Input, tools, techniques and outputs defined in the three quality management processes",
          "Understand the reasons for and approaches to adapting quality management in different project environments",
          "Identify quality tools and approaches for continuous improvement",
        ],
      },
      {
        title: "Project Resource Management",
        items: [
          "Define the six project management processes in the project resource management knowledge area",
          "Identify the Input, tools, techniques and outputs defined in the six processes in project resource management",
          "Identify key concepts and trends in project resource management, including tailoring and special considerations for agile/adaptive environments",
          "Identify techniques for developing a team, managing conflict, and resolving resource-related problems",
          "Understand the components of a resource management plan and data representation techniques for managing project resources",
        ],
      },
      {
        title: "Project Communication Management",
        items: [
          "Understand the three project management processes in the project communication management knowledge area",
          "Identify the Input, tools, techniques and outputs defined in the three project communication management processes",
          "Identify key concepts and approaches in project communication management, including tailoring and special considerations for agile/adaptive environments",
          "Recognize the dimensions of communication and components of a communications management plan",
          "Identify communications skills and methods for project communication Management",
        ],
      },
      {
        title: "Project Risk Management",
        items: [
          "Understand the seven project management processes in the project risk management knowledge area",
          "Identify the Input, tools, techniques and outputs defined in project risk management",
          "Identify the key documents in project risk management",
          "Perform simple risk calculations",
          "Recognize when and how to adjust risk based on the project environment",
        ],
      },
      {
        title: "Project Procurement Management",
        items: [
          "Understand the three processes in the project procurement management knowledge area",
          "Identify the Input, tools, techniques and outputs defined in the three project procurement processes",
          "Identify key concepts and tailoring considerations for project procurement management, including trends and emerging practices",
          "Identify various types of contracts, agreements, and source selection methods",
        ],
      },
      {
        title: "Project Stakeholder Management",
        items: [
          "Understand the four project management processes in the project stakeholder management knowledge area",
          "Identify the Input, tools, techniques and outputs defined in the four project stakeholder management processes",
          "Recognize key stakeholders roles and needs",
          "Identify the key concepts and benefits of stakeholder management",
        ],
      },
    ],
    features: [
      { icon: Clock, text: "24 Hours" },
      { icon: BookOpen, text: "23 Contact Hours" },
      { icon: Award, text: "PMI-CAPM Exam Content" },
      { icon: Users, text: "2 Full-Length Mock Exams" },
      { icon: CheckCircle, text: "Exam Tips and Techniques" },
      { icon: TrendingUp, text: "24/7 support" },
    ],
    faqs: [
      {
        question: "What is the CAPM®?",
        answer: "PMI's Certified Associate in Project Management (CAPM)® is a valuable entry-level certification for project practitioners. Designed for those with little or no project experience, the CAPM® demonstrates your understanding of the principles and terminology of A Guide to Project Management Body of Knowledge (PMBOK® Guide), the standard of project management's generally recognized good practices.",
      },
      {
        question: "What is the best way to prepare for the CAPM?",
        answer: "A Successful CAPM candidates typically use multiple study aids — including courses, self-study and study groups — and will spend many hours to prepare, so make sure you leave yourself plenty of preparation time before you take the exam. PMI.org has a CAPM Exam Prep page dedicated to linking you to in-person and online resources to help you prepare for the CAPM Exam in a way that works for you.",
      },
      {
        question: "What are the passing criteria for the CAPM exam?",
        answer: "The CAPM exam does not have any specific percentage. PMI uses its own set of rules to determine pass or fail.",
      },
      {
        question: "What is the cost of the CAPM exam?",
        answer: "Cost for PMI members is $225. Cost for nonmembers is $300. The cost for PMI membership is $129/year, plus a $10 application fee. Membership in a local PMI chapter is an additional fee which varies by chapter. Check the PMI website, www.pmi.org",
      },
      {
        question: "What is the duration of the Certified Associate in Project Management exam?",
        answer: "The duration of the exam is over three hours.",
      },
      {
        question: "How can one apply for the CAPM certification?",
        answer: "One can apply for the certification through the PMI website. These are a few steps to apply: Creating an account on the PMI website, The application must be completed, Education details should be submitted, Applying for review and approval.",
      },
      {
        question: "What is the cost to retake the exam?",
        answer: "Cost for PMI members, $150. Cost for nonmembers, $200.",
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
                                    <span className="text-primary mt-1 text-base">•</span>
                                    <span className="text-gray-700 text-base leading-relaxed">{item}</span>
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
                                <h3 className="font-semibold text-gray-900 text-base">{faq.question}</h3>
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
                                      <p className="text-gray-700 text-base leading-relaxed">{faq.answer}</p>
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
