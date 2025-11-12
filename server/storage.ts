import { type User, type InsertUser, type AITool, type InsertAITool, type MediaProfile, type InsertMediaProfile, type Workshop, type InsertWorkshop, type Session, type InsertSession, type Prompt, type InsertPrompt, users, aiTools, mediaProfiles, workshops, sessions, prompts } from "@shared/schema";
import { db } from "./db";
import { eq, asc, ilike, or, desc } from "drizzle-orm";
import path from "path";
import fs from "fs/promises";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  isUserAdmin(userId: string): Promise<boolean>;
  
  getAITools(filters?: { category?: string; search?: string }): Promise<AITool[]>;
  getAIToolById(id: string): Promise<AITool | undefined>;
  createAITool(tool: InsertAITool): Promise<AITool>;
  updateAITool(id: string, tool: Partial<InsertAITool>): Promise<AITool | undefined>;
  deleteAITool(id: string): Promise<void>;
  
  getMediaProfiles(filters?: { category?: string; featured?: boolean }): Promise<MediaProfile[]>;
  getMediaProfileById(id: string): Promise<MediaProfile | undefined>;
  createMediaProfile(profile: InsertMediaProfile): Promise<MediaProfile>;
  updateMediaProfile(id: string, profile: Partial<InsertMediaProfile>): Promise<MediaProfile | undefined>;
  deleteMediaProfile(id: string): Promise<void>;
  
  getWorkshops(): Promise<Workshop[]>;
  getWorkshopById(id: string): Promise<Workshop | undefined>;
  createWorkshop(workshop: InsertWorkshop): Promise<Workshop>;
  updateWorkshop(id: string, workshop: Partial<InsertWorkshop>): Promise<Workshop | undefined>;
  deleteWorkshop(id: string): Promise<void>;
  
  getSessionsByWorkshop(workshopId: string): Promise<Session[]>;
  getSessionById(id: string): Promise<Session | undefined>;
  createSession(session: InsertSession): Promise<Session>;
  updateSession(id: string, session: Partial<InsertSession>): Promise<Session | undefined>;
  deleteSession(id: string): Promise<void>;
  
  getPrompts(filters?: { category?: string; featured?: boolean }): Promise<Prompt[]>;
  getPromptById(id: string): Promise<Prompt | undefined>;
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
  updatePrompt(id: string, prompt: Partial<InsertPrompt>): Promise<Prompt | undefined>;
  deletePrompt(id: string): Promise<void>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.googleId, googleId));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, updateData: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users).set(updateData).where(eq(users.id, id)).returning();
    return user;
  }

  async isUserAdmin(userId: string): Promise<boolean> {
    const user = await this.getUser(userId);
    return user?.isAdmin === 1;
  }

  async getAITools(filters?: { category?: string; search?: string }): Promise<AITool[]> {
    const conditions = [];
    
    if (filters?.category && filters.category !== "All") {
      conditions.push(eq(aiTools.category, filters.category));
    }
    
    if (filters?.search) {
      conditions.push(
        or(
          ilike(aiTools.name, `%${filters.search}%`),
          ilike(aiTools.description, `%${filters.search}%`),
          ilike(aiTools.useCases, `%${filters.search}%`)
        )
      );
    }
    
    if (conditions.length > 0) {
      const tools = await db
        .select()
        .from(aiTools)
        .where(conditions.length === 1 ? conditions[0] : or(...conditions)!)
        .orderBy(asc(aiTools.sortOrder), asc(aiTools.name));
      return tools;
    }
    
    const tools = await db
      .select()
      .from(aiTools)
      .orderBy(asc(aiTools.sortOrder), asc(aiTools.name));
    return tools;
  }

  async getAIToolById(id: string): Promise<AITool | undefined> {
    const [tool] = await db.select().from(aiTools).where(eq(aiTools.id, id));
    return tool;
  }

  async createAITool(insertTool: InsertAITool): Promise<AITool> {
    const [tool] = await db.insert(aiTools).values(insertTool).returning();
    return tool;
  }

  async updateAITool(id: string, updates: Partial<InsertAITool>): Promise<AITool | undefined> {
    const [tool] = await db
      .update(aiTools)
      .set(updates)
      .where(eq(aiTools.id, id))
      .returning();
    return tool;
  }

  async deleteAITool(id: string): Promise<void> {
    await db.delete(aiTools).where(eq(aiTools.id, id));
  }

  async getMediaProfiles(filters?: { category?: string; featured?: boolean }): Promise<MediaProfile[]> {
    const conditions = [];
    
    if (filters?.category && filters.category !== "All") {
      conditions.push(eq(mediaProfiles.category, filters.category));
    }
    
    if (filters?.featured) {
      conditions.push(eq(mediaProfiles.featured, 1));
    }
    
    if (conditions.length > 0) {
      const profiles = await db
        .select()
        .from(mediaProfiles)
        .where(conditions.length === 1 ? conditions[0] : or(...conditions)!)
        .orderBy(desc(mediaProfiles.featured), asc(mediaProfiles.sortOrder), asc(mediaProfiles.name));
      return profiles;
    }
    
    const profiles = await db
      .select()
      .from(mediaProfiles)
      .orderBy(desc(mediaProfiles.featured), asc(mediaProfiles.sortOrder), asc(mediaProfiles.name));
    return profiles;
  }

  async getMediaProfileById(id: string): Promise<MediaProfile | undefined> {
    const [profile] = await db.select().from(mediaProfiles).where(eq(mediaProfiles.id, id));
    return profile;
  }

  async createMediaProfile(insertProfile: InsertMediaProfile): Promise<MediaProfile> {
    const [profile] = await db.insert(mediaProfiles).values(insertProfile).returning();
    return profile;
  }

  async updateMediaProfile(id: string, updates: Partial<InsertMediaProfile>): Promise<MediaProfile | undefined> {
    const [profile] = await db
      .update(mediaProfiles)
      .set(updates)
      .where(eq(mediaProfiles.id, id))
      .returning();
    return profile;
  }

  async deleteMediaProfile(id: string): Promise<void> {
    await db.delete(mediaProfiles).where(eq(mediaProfiles.id, id));
  }

  async getWorkshops(): Promise<Workshop[]> {
    const allWorkshops = await db
      .select()
      .from(workshops)
      .orderBy(asc(workshops.sortOrder), asc(workshops.title));
    return allWorkshops;
  }

  async getWorkshopById(id: string): Promise<Workshop | undefined> {
    const [workshop] = await db.select().from(workshops).where(eq(workshops.id, id));
    return workshop;
  }

  async createWorkshop(insertWorkshop: InsertWorkshop): Promise<Workshop> {
    const [workshop] = await db.insert(workshops).values(insertWorkshop).returning();
    return workshop;
  }

  async updateWorkshop(id: string, updates: Partial<InsertWorkshop>): Promise<Workshop | undefined> {
    const [workshop] = await db
      .update(workshops)
      .set(updates)
      .where(eq(workshops.id, id))
      .returning();
    return workshop;
  }

  async deleteWorkshop(id: string): Promise<void> {
    await db.delete(workshops).where(eq(workshops.id, id));
  }

  async getSessionsByWorkshop(workshopId: string): Promise<Session[]> {
    const workshopSessions = await db
      .select()
      .from(sessions)
      .where(eq(sessions.workshopId, workshopId))
      .orderBy(asc(sessions.sortOrder), asc(sessions.title));
    return workshopSessions;
  }

  async getSessionById(id: string): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.id, id));
    return session;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const [session] = await db.insert(sessions).values(insertSession).returning();
    return session;
  }

  async updateSession(id: string, updates: Partial<InsertSession>): Promise<Session | undefined> {
    const existingSession = await this.getSessionById(id);
    
    if (existingSession && updates.htmlContentUrl && 
        existingSession.htmlContentUrl?.startsWith("/uploads/workshops/") &&
        existingSession.htmlContentUrl !== updates.htmlContentUrl) {
      try {
        const filename = path.basename(existingSession.htmlContentUrl);
        const filePath = path.join(process.cwd(), "server", "uploads", "workshops", filename);
        await fs.unlink(filePath);
      } catch (error) {
        console.error(`Failed to delete old file for session ${id}:`, error);
      }
    }
    
    const [session] = await db
      .update(sessions)
      .set(updates)
      .where(eq(sessions.id, id))
      .returning();
    return session;
  }

  async deleteSession(id: string): Promise<void> {
    const session = await this.getSessionById(id);
    
    if (session?.htmlContentUrl && session.htmlContentUrl.startsWith("/uploads/workshops/")) {
      try {
        const filename = path.basename(session.htmlContentUrl);
        const filePath = path.join(process.cwd(), "server", "uploads", "workshops", filename);
        await fs.unlink(filePath);
      } catch (error) {
        console.error(`Failed to delete file for session ${id}:`, error);
      }
    }
    
    await db.delete(sessions).where(eq(sessions.id, id));
  }

  async getPrompts(filters?: { category?: string; featured?: boolean }): Promise<Prompt[]> {
    const conditions = [];
    
    if (filters?.category && filters.category !== "All") {
      conditions.push(eq(prompts.category, filters.category));
    }
    
    if (filters?.featured) {
      conditions.push(eq(prompts.featured, 1));
    }
    
    if (conditions.length > 0) {
      const allPrompts = await db
        .select()
        .from(prompts)
        .where(conditions.length === 1 ? conditions[0] : or(...conditions)!)
        .orderBy(desc(prompts.featured), asc(prompts.sortOrder), asc(prompts.title));
      return allPrompts;
    }
    
    const allPrompts = await db
      .select()
      .from(prompts)
      .orderBy(desc(prompts.featured), asc(prompts.sortOrder), asc(prompts.title));
    return allPrompts;
  }

  async getPromptById(id: string): Promise<Prompt | undefined> {
    const [prompt] = await db.select().from(prompts).where(eq(prompts.id, id));
    return prompt;
  }

  async createPrompt(insertPrompt: InsertPrompt): Promise<Prompt> {
    const [prompt] = await db.insert(prompts).values(insertPrompt).returning();
    return prompt;
  }

  async updatePrompt(id: string, updates: Partial<InsertPrompt>): Promise<Prompt | undefined> {
    const [prompt] = await db
      .update(prompts)
      .set(updates)
      .where(eq(prompts.id, id))
      .returning();
    return prompt;
  }

  async deletePrompt(id: string): Promise<void> {
    await db.delete(prompts).where(eq(prompts.id, id));
  }
}

export const storage = new DbStorage();
