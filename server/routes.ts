import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import createMemoryStore from "memorystore";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import { insertUserSchema, insertAIToolSchema, insertMediaProfileSchema, insertWorkshopSchema, insertSessionSchema, insertPromptSchema } from "@shared/schema";
import { z } from "zod";
import { requireAdmin } from "./middleware/admin";

const MemoryStore = createMemoryStore(session);

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "dovito-edu-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      store: new MemoryStore({
        checkPeriod: 86400000,
      }),
    })
  );

  app.post("/api/register", async (req, res) => {
    try {
      const { email, password, name } = insertUserSchema.parse(req.body);

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        name: name || null,
      });

      req.session.userId = user.id;

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });

  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isAdmin = await storage.isUserAdmin(req.session.userId);

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin,
    });
  });

  app.get("/api/ai-tools", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      const tools = await storage.getAITools({
        category: category as string | undefined,
        search: search as string | undefined,
      });

      res.json(tools);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI tools" });
    }
  });

  app.get("/api/ai-tools/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const tool = await storage.getAIToolById(id);
      if (!tool) {
        return res.status(404).json({ message: "AI tool not found" });
      }

      res.json(tool);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI tool" });
    }
  });

  app.get("/api/media-profiles", async (req, res) => {
    try {
      const { category, featured } = req.query;
      
      const profiles = await storage.getMediaProfiles({
        category: category as string | undefined,
        featured: featured === "true",
      });

      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media profiles" });
    }
  });

  app.get("/api/media-profiles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const profile = await storage.getMediaProfileById(id);
      if (!profile) {
        return res.status(404).json({ message: "Media profile not found" });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media profile" });
    }
  });

  app.get("/api/admin/check", async (req, res) => {
    if (!req.session.userId) {
      return res.json({ isAdmin: false });
    }

    const isAdmin = await storage.isUserAdmin(req.session.userId);
    res.json({ isAdmin });
  });

  app.post("/api/admin/ai-tools", requireAdmin, async (req, res) => {
    try {
      const data = insertAIToolSchema.parse(req.body);
      const tool = await storage.createAITool(data);
      res.json(tool);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create AI tool" });
    }
  });

  app.patch("/api/admin/ai-tools/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const data = insertAIToolSchema.partial().parse(req.body);
      const tool = await storage.updateAITool(id, data);
      if (!tool) {
        return res.status(404).json({ message: "AI tool not found" });
      }
      res.json(tool);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to update AI tool" });
    }
  });

  app.delete("/api/admin/ai-tools/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteAITool(id);
      res.json({ message: "AI tool deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete AI tool" });
    }
  });

  app.post("/api/admin/media-profiles", requireAdmin, async (req, res) => {
    try {
      const data = insertMediaProfileSchema.parse(req.body);
      const profile = await storage.createMediaProfile(data);
      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create media profile" });
    }
  });

  app.patch("/api/admin/media-profiles/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const data = insertMediaProfileSchema.partial().parse(req.body);
      const profile = await storage.updateMediaProfile(id, data);
      if (!profile) {
        return res.status(404).json({ message: "Media profile not found" });
      }
      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to update media profile" });
    }
  });

  app.delete("/api/admin/media-profiles/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteMediaProfile(id);
      res.json({ message: "Media profile deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete media profile" });
    }
  });

  app.get("/api/workshops", async (req, res) => {
    try {
      const workshops = await storage.getWorkshops();
      res.json(workshops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workshops" });
    }
  });

  app.get("/api/workshops/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const workshop = await storage.getWorkshopById(id);
      if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      res.json(workshop);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workshop" });
    }
  });

  app.get("/api/workshops/:id/sessions", async (req, res) => {
    try {
      const { id } = req.params;
      const sessions = await storage.getSessionsByWorkshop(id);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  app.get("/api/sessions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const session = await storage.getSessionById(id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch session" });
    }
  });

  app.get("/api/prompts", async (req, res) => {
    try {
      const { category, featured } = req.query;
      const prompts = await storage.getPrompts({
        category: category as string | undefined,
        featured: featured === "true",
      });
      res.json(prompts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prompts" });
    }
  });

  app.get("/api/prompts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const prompt = await storage.getPromptById(id);
      if (!prompt) {
        return res.status(404).json({ message: "Prompt not found" });
      }
      res.json(prompt);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prompt" });
    }
  });

  app.post("/api/admin/workshops", requireAdmin, async (req, res) => {
    try {
      const data = insertWorkshopSchema.parse(req.body);
      const workshop = await storage.createWorkshop(data);
      res.json(workshop);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create workshop" });
    }
  });

  app.patch("/api/admin/workshops/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const data = insertWorkshopSchema.partial().parse(req.body);
      const workshop = await storage.updateWorkshop(id, data);
      if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      res.json(workshop);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to update workshop" });
    }
  });

  app.delete("/api/admin/workshops/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteWorkshop(id);
      res.json({ message: "Workshop deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete workshop" });
    }
  });

  app.post("/api/admin/sessions", requireAdmin, async (req, res) => {
    try {
      const data = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(data);
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create session" });
    }
  });

  app.patch("/api/admin/sessions/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const data = insertSessionSchema.partial().parse(req.body);
      const session = await storage.updateSession(id, data);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to update session" });
    }
  });

  app.delete("/api/admin/sessions/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteSession(id);
      res.json({ message: "Session deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete session" });
    }
  });

  app.post("/api/admin/prompts", requireAdmin, async (req, res) => {
    try {
      const data = insertPromptSchema.parse(req.body);
      const prompt = await storage.createPrompt(data);
      res.json(prompt);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create prompt" });
    }
  });

  app.patch("/api/admin/prompts/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const data = insertPromptSchema.partial().parse(req.body);
      const prompt = await storage.updatePrompt(id, data);
      if (!prompt) {
        return res.status(404).json({ message: "Prompt not found" });
      }
      res.json(prompt);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to update prompt" });
    }
  });

  app.delete("/api/admin/prompts/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePrompt(id);
      res.json({ message: "Prompt deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete prompt" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
