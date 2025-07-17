import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBriefingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Briefing routes
  app.post("/api/briefings", async (req, res) => {
    try {
      console.log("Received briefing data:", req.body);
      const briefingData = insertBriefingSchema.parse(req.body);
      console.log("Parsed briefing data:", briefingData);
      const savedBriefing = await storage.saveBriefing(briefingData);
      console.log("Saved briefing:", savedBriefing);
      res.json(savedBriefing);
    } catch (error) {
      console.error("Error saving briefing:", error);
      res.status(400).json({ error: "Invalid briefing data", details: error instanceof Error ? error.message : String(error) });
    }
  });

  app.get("/api/briefings", async (req, res) => {
    try {
      const briefings = await storage.getSavedBriefings();
      res.json(briefings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch briefings" });
    }
  });

  app.get("/api/briefings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const briefing = await storage.getBriefing(id);
      if (!briefing) {
        res.status(404).json({ error: "Briefing not found" });
        return;
      }
      res.json(briefing);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch briefing" });
    }
  });

  app.delete("/api/briefings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteBriefing(id);
      if (!deleted) {
        res.status(404).json({ error: "Briefing not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete briefing" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
