import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail, sendCorporateEmail } from "./email";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);

  return httpServer;
}
