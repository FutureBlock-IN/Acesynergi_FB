import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dotenv from "dotenv";
import path from "path";

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

console.log('\n' + '='.repeat(60));
console.log('[Server] Environment Configuration');
console.log('='.repeat(60));
console.log('[Server] RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✓ Set (' + process.env.RESEND_API_KEY.substring(0, 10) + '...)' : '❌ NOT SET');
console.log('[Server] PORT:', process.env.PORT || '5000 (default)');
console.log('='.repeat(60) + '\n');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // cPanel Node.js apps typically use port 3000, but check your Node.js Selector settings
  // Default to 5000 for local development, but should be set via environment variable in production
  const port = parseInt(process.env.PORT || '5000', 10);
  
  server.listen(port, "0.0.0.0", () => {
    log(`✓ Server started successfully on port ${port}`);
    log(`✓ API endpoints available at: http://localhost:${port}/api/`);
    log(`✓ Health check: http://localhost:${port}/api/health`);
  }).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      log(`❌ Port ${port} is already in use. Please check your PORT environment variable or stop the conflicting process.`, "error");
    } else {
      log(`❌ Server failed to start: ${err.message}`, "error");
    }
    process.exit(1);
  });
})();