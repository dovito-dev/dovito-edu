import { type User, type InsertUser, type AITool, users, aiTools } from "@shared/schema";
import { db } from "./db";
import { eq, asc, ilike, or } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  isUserAdmin(userId: string): Promise<boolean>;
  
  getAITools(filters?: { category?: string; search?: string }): Promise<AITool[]>;
  getAIToolById(id: string): Promise<AITool | undefined>;
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
}

export const storage = new DbStorage();
