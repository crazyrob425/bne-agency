CREATE TABLE "application_drafts" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"sessionId" varchar(128) NOT NULL,
	"type" varchar(32) NOT NULL,
	"data" jsonb NOT NULL,
	"files" jsonb DEFAULT '[]'::jsonb,
	"lastStep" varchar(128),
	"abandonedAt" timestamp,
	"savedForLater" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "application_drafts_sessionId_unique" UNIQUE("sessionId")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "membersAccessGranted" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "membersPermissions" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "firebaseUid" varchar(128);--> statement-breakpoint
ALTER TABLE "application_drafts" ADD CONSTRAINT "application_drafts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;