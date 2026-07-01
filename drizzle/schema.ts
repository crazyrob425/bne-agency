import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here

export const onboardingApplications = mysqlTable("onboarding_applications", {
  id: int("id").autoincrement().primaryKey(),
  stageName: varchar("stageName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  country: varchar("country", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["pending", "reviewed", "accepted", "rejected"]).default("pending").notNull(),
  
  // Save the full path array directly
  revenuePaths: json("revenuePaths").notNull(),
  
  // Store all other form responses in a single JSON blob for maximum flexibility
  responses: json("responses").notNull(),
  
  // Store file URLs (headshots, digitals)
  files: json("files"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OnboardingApplication = typeof onboardingApplications.$inferSelect;
export type InsertOnboardingApplication = typeof onboardingApplications.$inferInsert;