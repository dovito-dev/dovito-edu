import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
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

export const workshops = pgTable("workshops", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  workshopId: varchar("workshop_id").notNull().references(() => workshops.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  duration: text("duration"),
  htmlContentUrl: text("html_content_url"),
  videoUrl: text("video_url"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const prompts = pgTable("prompts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  featured: integer("featured").default(0),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertAIToolSchema = createInsertSchema(aiTools).omit({
  id: true,
});

export const insertMediaProfileSchema = createInsertSchema(mediaProfiles).omit({
  id: true,
});

export const insertWorkshopSchema = createInsertSchema(workshops).omit({
  id: true,
  createdAt: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  createdAt: true,
});

export const insertPromptSchema = createInsertSchema(prompts).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAITool = z.infer<typeof insertAIToolSchema>;
export type AITool = typeof aiTools.$inferSelect;

export type InsertMediaProfile = z.infer<typeof insertMediaProfileSchema>;
export type MediaProfile = typeof mediaProfiles.$inferSelect;

export type InsertWorkshop = z.infer<typeof insertWorkshopSchema>;
export type Workshop = typeof workshops.$inferSelect;

export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;

export type InsertPrompt = z.infer<typeof insertPromptSchema>;
export type Prompt = typeof prompts.$inferSelect;
