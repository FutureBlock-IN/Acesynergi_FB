import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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

// Helper function to get blogs file path
function getBlogsFilePath(): string {
  // Allow environment variable to override the path (useful for cPanel deployments)
  if (process.env.BLOGS_FILE_PATH) {
    const envPath = path.resolve(process.env.BLOGS_FILE_PATH);
    if (fs.existsSync(envPath)) {
      console.log(`[Blog API] ✓ Found blogs file at (from env): ${envPath}`);
      return envPath;
    } else {
      console.warn(`[Blog API] ⚠ Environment variable BLOGS_FILE_PATH set but file not found: ${envPath}`);
    }
  }

  // Try multiple possible locations (prioritize dist/server/data for production)
  const possiblePaths = [
    // Production paths (dist folder)
    path.resolve(process.cwd(), 'dist', 'server', 'data', 'blogs.json'),
    path.resolve(process.cwd(), 'server', 'data', 'blogs.json'),
    // Development paths
    path.resolve(process.cwd(), 'client', 'src', 'data', 'blogs.json'),
  ];
  
  // Add fallback path relative to this file (ES module compatible)
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    possiblePaths.push(path.resolve(__dirname, '..', 'client', 'src', 'data', 'blogs.json'));
  } catch (e) {
    // If import.meta.url is not available, skip this path
    console.warn('[Blog API] Could not determine __dirname, skipping relative path fallback');
  }

  console.log(`[Blog API] Current working directory: ${process.cwd()}`);
  console.log(`[Blog API] Searching for blogs.json in ${possiblePaths.length} locations...`);

  for (const blogPath of possiblePaths) {
    if (fs.existsSync(blogPath)) {
      console.log(`[Blog API] ✓ Found blogs.json at: ${blogPath}`);
      return blogPath;
    } else {
      console.log(`[Blog API] ✗ Not found: ${blogPath}`);
    }
  }

  // If not found, return the most likely production path and let the write function create it
  const defaultPath = path.resolve(process.cwd(), 'dist', 'server', 'data', 'blogs.json');
  console.warn(`[Blog API] ⚠ blogs.json not found in any location. Will use/create: ${defaultPath}`);
  return defaultPath;
}

// Helper function to read blogs from file
function readBlogsFromFile(): any[] {
  const blogsFilePath = getBlogsFilePath();
  
  // Ensure directory exists
  const dir = path.dirname(blogsFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Read existing blogs
  if (fs.existsSync(blogsFilePath)) {
    try {
      const fileContent = fs.readFileSync(blogsFilePath, 'utf-8');
      const blogs = JSON.parse(fileContent);
      if (!Array.isArray(blogs)) {
        console.warn('[Blog API] blogs.json is not an array, resetting to empty array');
        return [];
      }
      return blogs;
    } catch (parseError: any) {
      console.error('[Blog API] Error parsing blogs.json:', parseError?.message);
      return [];
    }
  }
  return [];
}

// Helper function to write blogs to file
function writeBlogsToFile(blogs: any[]): void {
  const blogsFilePath = getBlogsFilePath();
  fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2), 'utf-8');
}

// Helper function to handle blog creation
function createBlogHandler(req: any, res: any) {
  console.log('[Blog API] ========== CREATE REQUEST ==========');
  
  try {
    const { id, title, category, content, author, publishDate, coverImage, slug } = req.body;
    
    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Content is required" });
    }
    if (!slug || !slug.trim()) {
      return res.status(400).json({ error: "Slug is required" });
    }

    const blogs = readBlogsFromFile();

    // Check if slug already exists
    if (blogs.some((blog: any) => blog.slug === slug)) {
      return res.status(400).json({ error: "A blog with this slug already exists" });
    }

    // Add new blog
    const newBlog = {
      id: id || Date.now().toString(),
      title: title.trim(),
      category,
      content: content.trim(),
      author: author || 'Acesynergi',
      publishDate: publishDate || new Date().toISOString(),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop&q=80',
      slug: slug.trim(),
    };

    blogs.push(newBlog);
    writeBlogsToFile(blogs);

    console.log('[Blog API] Blog post created successfully:', newBlog.id);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, blog: newBlog });
  } catch (error: any) {
    console.error('[Blog API] Error:', error?.message || error);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ 
      error: error?.message || "Failed to create blog post. Please try again.",
      details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}

// Helper function to handle blog update
function updateBlogHandler(req: any, res: any) {
  console.log('[Blog API] ========== UPDATE REQUEST ==========');
  
  try {
    const { id } = req.params;
    const { title, category, content, slug } = req.body;
    
    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Content is required" });
    }
    if (!slug || !slug.trim()) {
      return res.status(400).json({ error: "Slug is required" });
    }

    const blogs = readBlogsFromFile();
    const blogIndex = blogs.findIndex((blog: any) => blog.id === id);
    
    if (blogIndex === -1) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Check if slug already exists for another blog
    if (blogs.some((blog: any) => blog.slug === slug && blog.id !== id)) {
      return res.status(400).json({ error: "A blog with this slug already exists" });
    }

    // Update blog
    blogs[blogIndex] = {
      ...blogs[blogIndex],
      title: title.trim(),
      category,
      content: content.trim(),
      slug: slug.trim(),
    };

    writeBlogsToFile(blogs);

    console.log('[Blog API] Blog post updated successfully:', id);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, blog: blogs[blogIndex] });
  } catch (error: any) {
    console.error('[Blog API] Error:', error?.message || error);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ 
      error: error?.message || "Failed to update blog post. Please try again.",
      details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}

// Helper function to handle blog deletion
function deleteBlogHandler(req: any, res: any) {
  console.log('[Blog API] ========== DELETE REQUEST ==========');
  
  try {
    const { id } = req.params;

    const blogs = readBlogsFromFile();
    const blogIndex = blogs.findIndex((blog: any) => blog.id === id);
    
    if (blogIndex === -1) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Remove blog
    const deletedBlog = blogs.splice(blogIndex, 1)[0];
    writeBlogsToFile(blogs);

    console.log('[Blog API] Blog post deleted successfully:', id);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: true, message: "Blog post deleted successfully" });
  } catch (error: any) {
    console.error('[Blog API] Error:', error?.message || error);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ 
      error: error?.message || "Failed to delete blog post. Please try again.",
      details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}

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
  // Contact form submission (also handles "Talk to Advisor" from CourseDetails)
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message, type } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      console.log('[Contact API] Received submission:', { name, email, type: type || 'contact' });
      const result = await sendContactEmail({ name, email, phone, subject, message, type });
      console.log('[Contact API] Email send result:', JSON.stringify(result, null, 2));
      res.json({ success: true, message: "Thank you! We'll contact you soon." });
    } catch (error: any) {
      console.error('[Contact API] Error:', error?.message || error);
      res.status(500).json({ error: error?.message || "Failed to send message. Please try again." });
    }
  });

  // Corporate training inquiry submission
  app.post("/api/corporate", async (req, res) => {
    try {
      const { name, email, phone, comment } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      console.log('[Corporate API] Received submission:', { name, email });
      const result = await sendCorporateEmail({ name, email, phone, comment });
      console.log('[Corporate API] Email send result:', JSON.stringify(result, null, 2));
      res.json({ success: true, message: "Thank you! Our team will reach out within 24 hours." });
    } catch (error: any) {
      console.error('[Corporate API] Error:', error?.message || error);
      res.status(500).json({ error: error?.message || "Failed to send inquiry. Please try again." });
    }
  });

  // Blog API routes
  app.get("/api/blogs", (req, res) => {
    console.log('[Blog API] ========== GET /api/blogs REQUEST ==========');
    console.log('[Blog API] Request received at:', new Date().toISOString());
    console.log('[Blog API] Current working directory:', process.cwd());
    
    try {
      const blogs = readBlogsFromFile();
      console.log(`[Blog API] Successfully read ${blogs.length} blog(s) from file`);
      
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(blogs);
      console.log('[Blog API] ✓ Response sent successfully');
    } catch (error: any) {
      console.error('[Blog API] ❌ Error fetching blogs:', error?.message || error);
      console.error('[Blog API] Error stack:', error?.stack);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ error: "Failed to fetch blogs", details: error?.message });
    }
  });
  
  app.post("/api/blogs", createBlogHandler);
  app.put("/api/blogs/:id", updateBlogHandler);
  app.delete("/api/blogs/:id", deleteBlogHandler);

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
  console.log("[Routes]   GET    /api/blogs");
  console.log("[Routes]   POST   /api/blogs");
  console.log("[Routes]   PUT    /api/blogs/:id");
  console.log("[Routes]   DELETE /api/blogs/:id");
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
  
  // Contact form submission (also handles "Talk to Advisor" from CourseDetails)
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message, type } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      console.log('[Contact API] Received submission:', { name, email, type: type || 'contact' });
      const result = await sendContactEmail({ name, email, phone, subject, message, type });
      console.log('[Contact API] Email send result:', JSON.stringify(result, null, 2));
      res.json({ success: true, message: "Thank you! We'll contact you soon." });
    } catch (error: any) {
      console.error('[Contact API] Error:', error?.message || error);
      res.status(500).json({ error: error?.message || "Failed to send message. Please try again." });
    }
  });

  // Corporate training inquiry submission
  app.post("/api/corporate", async (req, res) => {
    try {
      const { name, email, phone, comment } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      console.log('[Corporate API] Received submission:', { name, email });
      const result = await sendCorporateEmail({ name, email, phone, comment });
      console.log('[Corporate API] Email send result:', JSON.stringify(result, null, 2));
      res.json({ success: true, message: "Thank you! Our team will reach out within 24 hours." });
    } catch (error: any) {
      console.error('[Corporate API] Error:', error?.message || error);
      res.status(500).json({ error: error?.message || "Failed to send inquiry. Please try again." });
    }
  });

  // Blog API routes
  app.get("/api/blogs", (req, res) => {
    console.log('[Blog API] ========== GET /api/blogs REQUEST ==========');
    console.log('[Blog API] Request received at:', new Date().toISOString());
    console.log('[Blog API] Current working directory:', process.cwd());
    
    try {
      const blogs = readBlogsFromFile();
      console.log(`[Blog API] Successfully read ${blogs.length} blog(s) from file`);
      
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(blogs);
      console.log('[Blog API] ✓ Response sent successfully');
    } catch (error: any) {
      console.error('[Blog API] ❌ Error fetching blogs:', error?.message || error);
      console.error('[Blog API] Error stack:', error?.stack);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ error: "Failed to fetch blogs", details: error?.message });
    }
  });
  
  app.post("/api/blogs", createBlogHandler);
  app.put("/api/blogs/:id", updateBlogHandler);
  app.delete("/api/blogs/:id", deleteBlogHandler);

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
  console.log("[Routes]   GET    /api/blogs");
  console.log("[Routes]   POST   /api/blogs");
  console.log("[Routes]   PUT    /api/blogs/:id");
  console.log("[Routes]   DELETE /api/blogs/:id");
  console.log("[Routes]   GET  /paypal/setup");
  console.log("[Routes]   POST /paypal/order");
  console.log("[Routes]   POST /paypal/order/:orderID/capture");
  console.log("[Routes] All routes registered successfully!");
}