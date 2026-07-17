import { decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

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

export const referrals = mysqlTable("referrals", {
  id: int("id").autoincrement().primaryKey(),
  referrerId: int("referrerId").notNull().references(() => users.id),
  applicantId: int("applicantId").references(() => onboardingApplications.id),
  status: mysqlEnum("status", ["applied", "vetting", "accepted", "paid"]).default("applied").notNull(),
  residualRate: decimal("residualRate", { precision: 5, scale: 2 }).default("0.00"),
  uniqueSlug: varchar("uniqueSlug", { length: 64 }).notNull().unique(),
  applicantEmail: varchar("applicantEmail", { length: 320 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = typeof referrals.$inferInsert;

export const referralPayments = mysqlTable("referral_payments", {
  id: int("id").autoincrement().primaryKey(),
  referralId: int("referralId").notNull().references(() => referrals.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 8 }).default("usd").notNull(),
  status: mysqlEnum("status", ["pending", "paid", "failed"]).default("pending").notNull(),
  paidAt: timestamp("paidAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ReferralPayment = typeof referralPayments.$inferSelect;
export type InsertReferralPayment = typeof referralPayments.$inferInsert;

/* ──────────────────────────────────────────────────────────────────────────
 * NICHE MATCHER — PROGRESS SAVING & RE-ENGAGEMENT SYSTEM
 * Local accounts (name/email/custom password) sit beside the Manus OAuth users
 * table. Quiz progress, a newsletter/contact list, and an email-reminder queue
 * power the automated re-engagement workflow.
 * ────────────────────────────────────────────────────────────────────────── */

/**
 * Local account credentials linked 1:1 to a `users` row.
 * Enables the required name / email / custom-password registration flow
 * alongside Manus OAuth sessions. Passwords are argon2id hashes (never plaintext).
 */
export const accountCredentials = mysqlTable("account_credentials", {
  id: int("id").autoincrement().primaryKey(),
  /** Owning user (FK → users.id). */
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  /** argon2id hash with embedded salt/params. */
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  /** Verification token for double opt-in email confirmation. */
  emailVerifyToken: varchar("emailVerifyToken", { length: 64 }),
  emailVerifiedAt: timestamp("emailVerifiedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AccountCredential = typeof accountCredentials.$inferSelect;
export type InsertAccountCredential = typeof accountCredentials.$inferInsert;

/**
 * Real-time quiz progress. One row per user. `answers` is the full quiz response
 * map keyed by question id; `lastCompletedQuestionId` is the resume anchor.
 */
export const quizProgress = mysqlTable("quiz_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  /** Slug of the last question the user completed (resume anchor). */
  lastCompletedQuestionId: varchar("lastCompletedQuestionId", { length: 128 }),
  /** All responses collected so far (quiz option values keyed by question id). */
  answers: json("answers").notNull(),
  /** Monotonic count of answered questions, for % completion display. */
  questionsAnswered: int("questionsAnswered").default(0).notNull(),
  /** true once the quiz is finished and a match has been produced. */
  completed: mysqlEnum("completed", ["0", "1"]).default("0").notNull(),
  /** Serialized match result once completed (top niches + vector). */
  resultSnapshot: json("resultSnapshot"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type QuizProgress = typeof quizProgress.$inferSelect;
export type InsertQuizProgress = typeof quizProgress.$inferInsert;

/**
 * Structured contact list, formatted for newsletter + site-update campaigns.
 * Populated from quiz registrations; supports segmentation by source & tags.
 */
export const subscribers = mysqlTable("subscribers", {
  id: int("id").autoincrement().primaryKey(),
  /** Owning user when the subscriber is also a registered account. */
  userId: int("userId").references(() => users.id, { onDelete: "set null" }),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull().unique(),
  source: varchar("source", { length: 64 }).default("niche-quiz").notNull(),
  status: mysqlEnum("status", ["subscribed", "unsubscribed", "bounced", "pending"]).default("pending").notNull(),
  /** Free-form segmentation tags (e.g. "high-earning", "bdsm-interest"). */
  tags: json("tags"),
  unsubscribedAt: timestamp("unsubscribedAt"),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;

/**
 * Email re-engagement queue. One row per scheduled send per abandoned quiz.
 * A cron-triggered worker scans `status='pending' AND sendAt<=now` and dispatches.
 */
export const emailReminders = mysqlTable("email_reminders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  email: varchar("email", { length: 320 }).notNull(),
  /** 'initial' | 'cadence' | 'weekly' — drives template selection. */
  kind: mysqlEnum("kind", ["initial", "cadence", "weekly"]).notNull(),
  /** Sequence index within the cadence (0 = 24h initial, 1..N follow-ups). */
  sequenceIndex: int("sequenceIndex").default(0).notNull(),
  /** Snapshot of how many quiz questions were answered at abandonment (for % complete in emails). */
  questionsAnswered: int("questionsAnswered").default(0).notNull(),
  /** ISO window label for reporting. */
  window: mysqlEnum("window", ["d24h", "w1-2", "w3-6"]).notNull(),
  /** Two randomized niche keywords teasing the match (stored for audit/render). */
  teaserNiches: json("teaserNiches"),
  status: mysqlEnum("status", ["pending", "sending", "sent", "failed", "cancelled"]).default("pending").notNull(),
  /** When the reminder is eligible to dispatch. */
  sendAt: timestamp("sendAt").notNull(),
  sentAt: timestamp("sentAt"),
  /** Provider message id when dispatched. */
  messageId: varchar("messageId", { length: 255 }),
  error: text("error"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailReminder = typeof emailReminders.$inferSelect;
export type InsertEmailReminder = typeof emailReminders.$inferInsert;

/* Cadence constants consumed by the scheduler. */
export const REENGAGEMENT_CADENCE = {
  /** Initial high-energy luxury reminder, exactly 24h after abandonment. */
  initialDelayHours: 24,
  /** Every 3 days for the first 2 weeks (14 days). */
  cadenceEveryDays: 3,
  cadenceDays: 14,
  /** Once weekly for the following month (28 days). */
  weeklyEveryDays: 7,
  weeklyDays: 28,
} as const;


