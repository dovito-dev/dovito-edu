import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
});

export const aiTools = pgTable("ai_tools", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  pricing: text("pricing").notNull(),
  features: text("features").array().notNull(),
  useCases: text("use_cases").notNull(),
  description: text("description").notNull(),
  link: text("link").notNull(),
  logo: text("logo"),
  sortOrder: integer("sort_order").default(0),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertAIToolSchema = createInsertSchema(aiTools).omit({
  id: true,
  sortOrder: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAITool = z.infer<typeof insertAIToolSchema>;
export type AITool = typeof aiTools.$inferSelect;
