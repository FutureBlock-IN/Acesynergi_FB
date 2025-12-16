// Vercel serverless function entry point
// This wraps the Express app for Vercel's serverless environment
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutesForVercel } from "../server/routes";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api") || path.startsWith("/paypal")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(logLine);
    }
  });

  next();
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Register all routes (without creating HTTP server)
let routesRegistered = false;

async function setupApp() {
  if (!routesRegistered) {
    await registerRoutesForVercel(app);
    routesRegistered = true;
  }
  return app;
}

// Vercel serverless function handler
// Vercel passes standard Node.js http.IncomingMessage and http.ServerResponse
// which are compatible with Express Request and Response types
export default async function handler(
  req: Request & { url?: string },
  res: Response
) {
  const app = await setupApp();
  
  // Ensure req.url is set for Express routing
  if (!req.url && req.path) {
    req.url = req.path + (req.query ? '?' + new URLSearchParams(req.query as any).toString() : '');
  }
  
  // Use Express app to handle the request
  return new Promise<void>((resolve, reject) => {
    app(req as any, res as any, (err?: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

