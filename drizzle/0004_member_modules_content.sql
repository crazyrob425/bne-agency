CREATE TABLE "content_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"fileName" text NOT NULL,
	"filePath" text NOT NULL,
	"mimeType" text NOT NULL,
	"fileSize" integer NOT NULL,
	"title" text,
	"notes" text,
	"status" text DEFAULT 'pending_review' NOT NULL,
	"staffFeedback" text,
	"reviewedBy" integer,
	"submittedAt" timestamp DEFAULT now() NOT NULL,
	"reviewedAt" timestamp,
	CONSTRAINT "content_submissions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action,
	CONSTRAINT "content_submissions_reviewedBy_users_id_fk" FOREIGN KEY ("reviewedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action
);
--> statement-breakpoint
CREATE TABLE "content_fingerprints" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"watermarkId" text NOT NULL,
	"fileName" text NOT NULL,
	"fileHash" text NOT NULL,
	"perceptualHash" text,
	"mimeType" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "content_fingerprints_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action,
	CONSTRAINT "content_fingerprints_watermarkId_unique" UNIQUE("watermarkId")
);
