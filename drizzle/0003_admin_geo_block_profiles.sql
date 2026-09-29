CREATE TABLE "geo_block_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientAlias" text NOT NULL,
	"platforms" text[] DEFAULT '{}' NOT NULL,
	"blockedStates" text[] DEFAULT '{}' NOT NULL,
	"blockedLocations" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"status" text DEFAULT 'requested' NOT NULL,
	"notes" text,
	"createdBy" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "geo_block_profiles_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action
);
