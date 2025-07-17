import { users, savedBriefings, type User, type InsertUser, type SavedBriefing, type InsertBriefing } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Briefing operations
  saveBriefing(briefing: InsertBriefing): Promise<SavedBriefing>;
  getSavedBriefings(): Promise<SavedBriefing[]>;
  deleteBriefing(id: number): Promise<boolean>;
  getBriefing(id: number): Promise<SavedBriefing | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async saveBriefing(insertBriefing: InsertBriefing): Promise<SavedBriefing> {
    const [briefing] = await db
      .insert(savedBriefings)
      .values(insertBriefing)
      .returning();
    return briefing;
  }

  async getSavedBriefings(): Promise<SavedBriefing[]> {
    const briefings = await db
      .select()
      .from(savedBriefings)
      .orderBy(savedBriefings.createdAt);
    return briefings.reverse(); // Most recent first
  }

  async deleteBriefing(id: number): Promise<boolean> {
    const result = await db
      .delete(savedBriefings)
      .where(eq(savedBriefings.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getBriefing(id: number): Promise<SavedBriefing | undefined> {
    const [briefing] = await db
      .select()
      .from(savedBriefings)
      .where(eq(savedBriefings.id, id));
    return briefing || undefined;
  }
}

export const storage = new DatabaseStorage();
