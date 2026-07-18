CREATE TYPE "public"."application_status" AS ENUM('pending', 'reviewed', 'accepted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."completed" AS ENUM('0', '1');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'failed');--> statement-breakpoint
CREATE TYPE "public"."referral_status" AS ENUM('applied', 'vetting', 'accepted', 'paid');--> statement-breakpoint
CREATE TYPE "public"."reminder_kind" AS ENUM('initial', 'cadence', 'weekly');--> statement-breakpoint
CREATE TYPE "public"."reminder_status" AS ENUM('pending', 'sending', 'sent', 'failed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."reminder_window" AS ENUM('d24h', 'w1-2', 'w3-6');--> statement-breakpoint
CREATE TYPE "public"."subscriber_status" AS ENUM('subscribed', 'unsubscribed', 'bounced', 'pending');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "account_credentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(320) NOT NULL,
	"passwordHash" varchar(255) NOT NULL,
	"emailVerifyToken" varchar(64),
	"emailVerifiedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "account_credentials_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "email_reminders" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"email" varchar(320) NOT NULL,
	"kind" "reminder_kind" NOT NULL,
	"sequenceIndex" integer DEFAULT 0 NOT NULL,
	"questionsAnswered" integer DEFAULT 0 NOT NULL,
	"window" "reminder_window" NOT NULL,
	"teaserNiches" jsonb,
	"status" "reminder_status" DEFAULT 'pending' NOT NULL,
	"sendAt" timestamp NOT NULL,
	"sentAt" timestamp,
	"messageId" varchar(255),
	"error" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "onboarding_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"stageName" varchar(255) NOT NULL,
	"email" varchar(320) NOT NULL,
	"country" varchar(255) NOT NULL,
	"status" "application_status" DEFAULT 'pending' NOT NULL,
	"revenuePaths" jsonb NOT NULL,
	"responses" jsonb NOT NULL,
	"files" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"lastCompletedQuestionId" varchar(128),
	"answers" jsonb NOT NULL,
	"questionsAnswered" integer DEFAULT 0 NOT NULL,
	"completed" "completed" DEFAULT '0' NOT NULL,
	"resultSnapshot" jsonb,
	"startedAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referral_payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"referralId" integer NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"currency" varchar(8) DEFAULT 'usd' NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"paidAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" serial PRIMARY KEY NOT NULL,
	"referrerId" integer NOT NULL,
	"applicantId" integer,
	"status" "referral_status" DEFAULT 'applied' NOT NULL,
	"residualRate" numeric(5, 2) DEFAULT '0.00',
	"uniqueSlug" varchar(64) NOT NULL,
	"applicantEmail" varchar(320),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "referrals_uniqueSlug_unique" UNIQUE("uniqueSlug")
);
--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"name" varchar(255),
	"email" varchar(320) NOT NULL,
	"source" varchar(64) DEFAULT 'niche-quiz' NOT NULL,
	"status" "subscriber_status" DEFAULT 'pending' NOT NULL,
	"tags" jsonb,
	"unsubscribedAt" timestamp,
	"subscribedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"stripeCustomerId" varchar(64),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
--> statement-breakpoint
ALTER TABLE "account_credentials" ADD CONSTRAINT "account_credentials_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_reminders" ADD CONSTRAINT "email_reminders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_progress" ADD CONSTRAINT "quiz_progress_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referral_payments" ADD CONSTRAINT "referral_payments_referralId_referrals_id_fk" FOREIGN KEY ("referralId") REFERENCES "public"."referrals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referrerId_users_id_fk" FOREIGN KEY ("referrerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_applicantId_onboarding_applications_id_fk" FOREIGN KEY ("applicantId") REFERENCES "public"."onboarding_applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;