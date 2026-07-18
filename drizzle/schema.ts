import { decimal, integer, serial, pgEnum, pgTable, text, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";

/**
 * Postgres enums (schema-level). Each enum needs a unique name.
 */
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const applicationStatusEnum = pgEnum("application_status", ["pending", "reviewed", "accepted", "rejected"]);
export const referralStatusEnum = pgEnum("referral_status", ["applied", "vetting", "accepted", "paid"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "paid", "failed"]);
export const completedEnum = pgEnum("completed", ["0", "1"]);
export const subscriberStatusEnum = pgEnum("subscriber_status", ["subscribed", "unsubscribed", "bounced", "pending"]);
export const reminderKindEnum = pgEnum("reminder_kind", ["initial", "cadence", "weekly"]);
export const reminderWindowEnum = pgEnum("reminder_window", ["d24h", "w1-2", "w3-6"]);
export const reminderStatusEnum = pgEnum("reminder_status", ["pending", "sending", "sent", "failed", "cancelled"]);

/**
 * Core user table backing auth flow.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  /** Unified members-portal access flag (grants access regardless of Firebase). */
  membersAccessGranted: integer("membersAccessGranted").default(0).notNull(),
  /** JSONB permissions map for fine-grained tool access in the members portal. */
  membersPermissions: jsonb("membersPermissions").default({} as any).notNull(),
  /** Firebase UID link for unified local+OAuth accounts. */
  firebaseUid: varchar("firebaseUid", { length: 128 }),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const onboardingApplications = pgTable("onboarding_applications", {
  id: serial("id").primaryKey(),
  stageName: varchar("stageName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  country: varchar("country", { length: 255 }).notNull(),
  status: applicationStatusEnum("status").default("pending").notNull(),
  revenuePaths: jsonb("revenuePaths").notNull(),
  responses: jsonb("responses").notNull(),
  files: jsonb("files"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type OnboardingApplication = typeof onboardingApplications.$inferSelect;
export type InsertOnboardingApplication = typeof onboardingApplications.$inferInsert;

export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerId: integer("referrerId").notNull().references(() => users.id),
  applicantId: integer("applicantId").references(() => onboardingApplications.id),
  status: referralStatusEnum("status").default("applied").notNull(),
  residualRate: decimal("residualRate", { precision: 5, scale: 2 }).default("0.00"),
  uniqueSlug: varchar("uniqueSlug", { length: 64 }).notNull().unique(),
  applicantEmail: varchar("applicantEmail", { length: 320 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = typeof referrals.$inferInsert;

export const referralPayments = pgTable("referral_payments", {
  id: serial("id").primaryKey(),
  referralId: integer("referralId").notNull().references(() => referrals.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 8 }).default("usd").notNull(),
  status: paymentStatusEnum("status").default("pending").notNull(),
  paidAt: timestamp("paidAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type ReferralPayment = typeof referralPayments.$inferSelect;
export type InsertReferralPayment = typeof referralPayments.$inferInsert;

/* ──────────────────────────────────────────────────────────────────────────
 * NICHE MATCHER — PROGRESS SAVING & RE-ENGAGEMENT SYSTEM
 * ────────────────────────────────────────────────────────────────────────── */

export const accountCredentials = pgTable("account_credentials", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  emailVerifyToken: varchar("emailVerifyToken", { length: 64 }),
  emailVerifiedAt: timestamp("emailVerifiedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type AccountCredential = typeof accountCredentials.$inferSelect;
export type InsertAccountCredential = typeof accountCredentials.$inferInsert;

export const quizProgress = pgTable("quiz_progress", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  lastCompletedQuestionId: varchar("lastCompletedQuestionId", { length: 128 }),
  answers: jsonb("answers").notNull(),
  questionsAnswered: integer("questionsAnswered").default(0).notNull(),
  completed: completedEnum("completed").default("0").notNull(),
  resultSnapshot: jsonb("resultSnapshot"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type QuizProgress = typeof quizProgress.$inferSelect;
export type InsertQuizProgress = typeof quizProgress.$inferInsert;

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id, { onDelete: "set null" }),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull().unique(),
  source: varchar("source", { length: 64 }).default("niche-quiz").notNull(),
  status: subscriberStatusEnum("status").default("pending").notNull(),
  tags: jsonb("tags"),
  unsubscribedAt: timestamp("unsubscribedAt"),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;

export const emailReminders = pgTable("email_reminders", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  email: varchar("email", { length: 320 }).notNull(),
  kind: reminderKindEnum("kind").notNull(),
  sequenceIndex: integer("sequenceIndex").default(0).notNull(),
  questionsAnswered: integer("questionsAnswered").default(0).notNull(),
  window: reminderWindowEnum("window").notNull(),
  teaserNiches: jsonb("teaserNiches"),
  status: reminderStatusEnum("status").default("pending").notNull(),
  sendAt: timestamp("sendAt").notNull(),
  sentAt: timestamp("sentAt"),
  messageId: varchar("messageId", { length: 255 }),
  error: text("error"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type EmailReminder = typeof emailReminders.$inferSelect;
export type InsertEmailReminder = typeof emailReminders.$inferInsert;

/* ──────────────────────────────────────────────────────────────────────────
 * APPLICATION DRAFTS — save/continue for onboarding + quiz flows
 * ────────────────────────────────────────────────────────────────────────── */

export const applicationDrafts = pgTable("application_drafts", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id, { onDelete: "cascade" }),
  sessionId: varchar("sessionId", { length: 128 }).notNull().unique(),
  /** 'onboarding' | 'quiz' | 'application' */
  type: varchar("type", { length: 32 }).notNull(),
  /** Partial form data / answers */
  data: jsonb("data").notNull(),
  /** Uploaded file paths */
  files: jsonb("files").default([] as any),
  /** Last answered question / step identifier */
  lastStep: varchar("lastStep", { length: 128 }),
  /** ISO timestamp of abandonment or last save */
  abandonedAt: timestamp("abandonedAt"),
  /** Whether user explicitly chose "finish later" */
  savedForLater: integer("savedForLater").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type ApplicationDraft = typeof applicationDrafts.$inferSelect;
export type InsertApplicationDraft = typeof applicationDrafts.$inferInsert;

/* Cadence constants consumed by the scheduler. */
export const REENGAGEMENT_CADENCE = {
  initialDelayHours: 24,
  cadenceEveryDays: 3,
  cadenceDays: 14,
  weeklyEveryDays: 7,
  weeklyDays: 28,
} as const;

