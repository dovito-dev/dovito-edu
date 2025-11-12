import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  isAdmin: integer("is_admin").default(0).notNull(),
});

export const aiTools = pgTable("ai_tools", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  pricing: text("pricing").notNull(),
  features: text("features").array().notNull(),
  useCases: text("use_cases").notNull(),
  description: text("description").notNull(),
  detailedDescription: text("detailed_description"),
  strengths: text("strengths").array(),
  weaknesses: text("weaknesses").array(),
  bestFor: text("best_for").array(),
  link: text("link").notNull(),
  logo: text("logo"),
  videoUrl: text("video_url"),
  sortOrder: integer("sort_order").default(0),
});

export const mediaProfiles = pgTable("media_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title"),
  bio: text("bio").notNull(),
  avatar: text("avatar"),
  youtubeUrl: text("youtube_url"),
  instagramUrl: text("instagram_url"),
  xUrl: text("x_url"),
  linkedinUrl: text("linkedin_url"),
  websiteUrl: text("website_url"),
  tiktokUrl: text("tiktok_url"),
  category: text("category"),
  featured: integer("featured").default(0),
  sortOrder: integer("sort_order").default(0),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertAIToolSchema = createInsertSchema(aiTools).omit({
  id: true,
  sortOrder: true,
});

export const insertMediaProfileSchema = createInsertSchema(mediaProfiles).omit({
  id: true,
  sortOrder: true,
  featured: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAITool = z.infer<typeof insertAIToolSchema>;
export type AITool = typeof aiTools.$inferSelect;

export type InsertMediaProfile = z.infer<typeof insertMediaProfileSchema>;
export type MediaProfile = typeof mediaProfiles.$inferSelect;
