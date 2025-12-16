import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail, sendCorporateEmail } from "./email";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import {
  getCoursePricing,
  getCoursePricingAllCountries,
  getCountryPricingAllCourses,
  getAvailableCourses,
  getAvailableCountries,
  createSampleExcelFile,
} from "./pricing";

export async function registerRoutes(app: Express): Promise<Server> {
  console.log("[Routes] Registering API routes...");
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "API is working", timestamp: new Date().toISOString() });
  });
  
  // PayPal routes
  app.get("/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/paypal/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });

  app.post("/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      console.log('Attempting to send contact email for:', name, email);
      const result = await sendContactEmail({ name, email, phone, subject, message });
      console.log('Email send result:', JSON.stringify(result, null, 2));
      res.json({ success: true, message: "Thank you! We'll contact you soon." });
    } catch (error: any) {
      console.error('Contact form error:', error);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      res.status(500).json({ error: "Failed to send message. Please try again." });
    }
  });

  // Corporate training inquiry submission
  app.post("/api/corporate", async (req, res) => {
    try {
      const { name, email, phone, comment } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      console.log('Attempting to send corporate email for:', name, email);
      const result = await sendCorporateEmail({ name, email, phone, comment });
      console.log('Email send result:', JSON.stringify(result, null, 2));
      res.json({ success: true, message: "Thank you! Our team will reach out within 24 hours." });
    } catch (error: any) {
      console.error('Corporate form error:', error);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      res.status(500).json({ error: "Failed to send inquiry. Please try again." });
    }
  });

  // Course Pricing API Routes
  // Get pricing for a specific course and country
  app.get("/api/pricing/:courseName/:country", async (req, res) => {
    try {
      const { courseName, country } = req.params;
      const decodedCourseName = decodeURIComponent(courseName);
      const decodedCountry = decodeURIComponent(country);
      
      console.log(`[API] Pricing request: courseName="${decodedCourseName}", country="${decodedCountry}"`);
      
      const pricing = getCoursePricing(decodedCourseName, decodedCountry);
      
      if (!pricing) {
        console.warn(`[API] Pricing not found: courseName="${decodedCourseName}", country="${decodedCountry}"`);
        return res.status(404).json({ 
          error: "Pricing not found for this course and country",
          courseName: decodedCourseName,
          country: decodedCountry
        });
      }
      
      console.log(`[API] Pricing found: ${pricing.courseName} - ${pricing.country} - Total: ${pricing.total}`);
      res.json(pricing);
    } catch (error: any) {
      console.error('[API] Pricing API error:', error);
      console.error('[API] Error stack:', error.stack);
      res.status(500).json({ error: "Failed to fetch pricing", details: error.message });
    }
  });

  // Get all pricing for a specific course (all countries)
  app.get("/api/pricing/:courseName", async (req, res) => {
    try {
      const { courseName } = req.params;
      const pricing = getCoursePricingAllCountries(decodeURIComponent(courseName));
      res.json(pricing);
    } catch (error: any) {
      console.error('Pricing API error:', error);
      res.status(500).json({ error: "Failed to fetch pricing" });
    }
  });

  // Get all pricing for a specific country (all courses)
  app.get("/api/pricing/country/:country", async (req, res) => {
    try {
      const { country } = req.params;
      const pricing = getCountryPricingAllCourses(decodeURIComponent(country));
      res.json(pricing);
    } catch (error: any) {
      console.error('Pricing API error:', error);
      res.status(500).json({ error: "Failed to fetch pricing" });
    }
  });

  // Get all available courses
  app.get("/api/pricing/courses", async (req, res) => {
    try {
      const courses = getAvailableCourses();
      res.json(courses);
    } catch (error: any) {
      console.error('Pricing API error:', error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  // Get all available countries
  app.get("/api/pricing/countries", async (req, res) => {
    try {
      const countries = getAvailableCountries();
      res.json(countries);
    } catch (error: any) {
      console.error('Pricing API error:', error);
      res.status(500).json({ error: "Failed to fetch countries" });
    }
  });

  // Create sample Excel file (admin endpoint - should be protected in production)
  app.post("/api/pricing/create-sample", async (req, res) => {
    try {
      createSampleExcelFile();
      res.json({ success: true, message: "Sample Excel file created successfully" });
    } catch (error: any) {
      console.error('Create sample Excel error:', error);
      res.status(500).json({ error: "Failed to create sample Excel file" });
    }
  });

  const httpServer = createServer(app);

  // Log all registered routes for debugging
  console.log("[Routes] API routes registered:");
  console.log("[Routes]   GET  /api/health");
  console.log("[Routes]   GET  /api/pricing/:courseName/:country");
  console.log("[Routes]   GET  /api/pricing/:courseName");
  console.log("[Routes]   GET  /api/pricing/country/:country");
  console.log("[Routes]   GET  /api/pricing/courses");
  console.log("[Routes]   GET  /api/pricing/countries");
  console.log("[Routes]   POST /api/pricing/create-sample");
  console.log("[Routes]   POST /api/contact");
  console.log("[Routes]   POST /api/corporate");
  console.log("[Routes] All routes registered successfully!");

  return httpServer;
}

// Vercel-compatible version that doesn't create HTTP server
export async function registerRoutesForVercel(app: Express): Promise<void> {
  console.log("[Routes] Registering API routes for Vercel...");
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "API is working", timestamp: new Date().toISOString() });
  });
  
  // PayPal routes
  app.get("/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/paypal/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });

  app.post("/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      console.log('Attempting to send contact email for:', name, email);
      const result = await sendContactEmail({ name, email, phone, subject, message });
      console.log('Email send result:', JSON.stringify(result, null, 2));
      res.json({ success: true, message: "Thank you! We'll contact you soon." });
    } catch (error: any) {
      console.error('Contact form error:', error);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      res.status(500).json({ error: "Failed to send message. Please try again." });
    }
  });

  // Corporate training inquiry submission
  app.post("/api/corporate", async (req, res) => {
    try {
      const { name, email, phone, comment } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      console.log('Attempting to send corporate email for:', name, email);
      const result = await sendCorporateEmail({ name, email, phone, comment });
      console.log('Email send result:', JSON.stringify(result, null, 2));
      res.json({ success: true, message: "Thank you! Our team will reach out within 24 hours." });
    } catch (error: any) {
      console.error('Corporate form error:', error);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      res.status(500).json({ error: "Failed to send inquiry. Please try again." });
    }
  });

  // Course Pricing API Routes
  // Get pricing for a specific course and country
  app.get("/api/pricing/:courseName/:country", async (req, res) => {
    try {
      const { courseName, country } = req.params;
      const decodedCourseName = decodeURIComponent(courseName);
      const decodedCountry = decodeURIComponent(country);
      
      console.log(`[API] Pricing request: courseName="${decodedCourseName}", country="${decodedCountry}"`);
      
      const pricing = getCoursePricing(decodedCourseName, decodedCountry);
      
      if (!pricing) {
        console.warn(`[API] Pricing not found: courseName="${decodedCourseName}", country="${decodedCountry}"`);
        return res.status(404).json({ 
          error: "Pricing not found for this course and country",
          courseName: decodedCourseName,
          country: decodedCountry
        });
      }
      
      console.log(`[API] Pricing found: ${pricing.courseName} - ${pricing.country} - Total: ${pricing.total}`);
      res.json(pricing);
    } catch (error: any) {
      console.error('[API] Pricing API error:', error);
      console.error('[API] Error stack:', error.stack);
      res.status(500).json({ error: "Failed to fetch pricing", details: error.message });
    }
  });

  // Get all pricing for a specific course (all countries)
  app.get("/api/pricing/:courseName", async (req, res) => {
    try {
      const { courseName } = req.params;
      const pricing = getCoursePricingAllCountries(decodeURIComponent(courseName));
      res.json(pricing);
    } catch (error: any) {
      console.error('Pricing API error:', error);
      res.status(500).json({ error: "Failed to fetch pricing" });
    }
  });

  // Get all pricing for a specific country (all courses)
  app.get("/api/pricing/country/:country", async (req, res) => {
    try {
      const { country } = req.params;
      const pricing = getCountryPricingAllCourses(decodeURIComponent(country));
      res.json(pricing);
    } catch (error: any) {
      console.error('Pricing API error:', error);
      res.status(500).json({ error: "Failed to fetch pricing" });
    }
  });

  // Get all available courses
  app.get("/api/pricing/courses", async (req, res) => {
    try {
      const courses = getAvailableCourses();
      res.json(courses);
    } catch (error: any) {
      console.error('Pricing API error:', error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  // Get all available countries
  app.get("/api/pricing/countries", async (req, res) => {
    try {
      const countries = getAvailableCountries();
      res.json(countries);
    } catch (error: any) {
      console.error('Pricing API error:', error);
      res.status(500).json({ error: "Failed to fetch countries" });
    }
  });

  // Create sample Excel file (admin endpoint - should be protected in production)
  app.post("/api/pricing/create-sample", async (req, res) => {
    try {
      createSampleExcelFile();
      res.json({ success: true, message: "Sample Excel file created successfully" });
    } catch (error: any) {
      console.error('Create sample Excel error:', error);
      res.status(500).json({ error: "Failed to create sample Excel file" });
    }
  });

  // Log all registered routes for debugging
  console.log("[Routes] API routes registered:");
  console.log("[Routes]   GET  /api/health");
  console.log("[Routes]   GET  /api/pricing/:courseName/:country");
  console.log("[Routes]   GET  /api/pricing/:courseName");
  console.log("[Routes]   GET  /api/pricing/country/:country");
  console.log("[Routes]   GET  /api/pricing/courses");
  console.log("[Routes]   GET  /api/pricing/countries");
  console.log("[Routes]   POST /api/pricing/create-sample");
  console.log("[Routes]   POST /api/contact");
  console.log("[Routes]   POST /api/corporate");
  console.log("[Routes]   GET  /paypal/setup");
  console.log("[Routes]   POST /paypal/order");
  console.log("[Routes]   POST /paypal/order/:orderID/capture");
  console.log("[Routes] All routes registered successfully!");
}