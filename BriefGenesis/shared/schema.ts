import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const savedBriefings = pgTable("saved_briefings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  area: text("area").notNull(),
  type: text("type").notNull(),
  audience: text("audience").notNull(),
  problem: text("problem").notNull(),
  objective: text("objective").notNull(),
  features: text("features").array().notNull(),
  duration: text("duration").notNull(),
  context: text("context").notNull(),
  constraints: text("constraints").array().notNull(),
  deliverables: text("deliverables").array().notNull(),
  inspiration: text("inspiration").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBriefingSchema = createInsertSchema(savedBriefings).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBriefing = z.infer<typeof insertBriefingSchema>;
export type SavedBriefing = typeof savedBriefings.$inferSelect;
