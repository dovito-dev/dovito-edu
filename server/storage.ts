import { type User, type InsertUser, type AITool, type InsertAITool, type MediaProfile, type InsertMediaProfile, users, aiTools, mediaProfiles } from "@shared/schema";
import { db } from "./db";
import { eq, asc, ilike, or, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
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
}

export const storage = new DbStorage();
