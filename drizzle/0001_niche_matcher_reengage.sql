CREATE TABLE `account_credentials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`emailVerifyToken` varchar(64),
	`emailVerifiedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `account_credentials_id` PRIMARY KEY(`id`),
	CONSTRAINT `account_credentials_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `email_reminders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`kind` enum('initial','cadence','weekly') NOT NULL,
	`sequenceIndex` int NOT NULL DEFAULT 0,
	`questionsAnswered` int NOT NULL DEFAULT 0,
	`window` enum('d24h','w1-2','w3-6') NOT NULL,
	`teaserNiches` json,
	`status` enum('pending','sending','sent','failed','cancelled') NOT NULL DEFAULT 'pending',
	`sendAt` timestamp NOT NULL,
	`sentAt` timestamp,
	`messageId` varchar(255),
	`error` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `email_reminders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `onboarding_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stageName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`country` varchar(255) NOT NULL,
	`status` enum('pending','reviewed','accepted','rejected') NOT NULL DEFAULT 'pending',
	`revenuePaths` json NOT NULL,
	`responses` json NOT NULL,
	`files` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `onboarding_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lastCompletedQuestionId` varchar(128),
	`answers` json NOT NULL,
	`questionsAnswered` int NOT NULL DEFAULT 0,
	`completed` enum('0','1') NOT NULL DEFAULT '0',
	`resultSnapshot` json,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quiz_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referral_payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referralId` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`currency` varchar(8) NOT NULL DEFAULT 'usd',
	`status` enum('pending','paid','failed') NOT NULL DEFAULT 'pending',
	`paidAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `referral_payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referrerId` int NOT NULL,
	`applicantId` int,
	`status` enum('applied','vetting','accepted','paid') NOT NULL DEFAULT 'applied',
	`residualRate` decimal(5,2) DEFAULT '0.00',
	`uniqueSlug` varchar(64) NOT NULL,
	`applicantEmail` varchar(320),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `referrals_id` PRIMARY KEY(`id`),
	CONSTRAINT `referrals_uniqueSlug_unique` UNIQUE(`uniqueSlug`)
);
--> statement-breakpoint
CREATE TABLE `subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`name` varchar(255),
	`email` varchar(320) NOT NULL,
	`source` varchar(64) NOT NULL DEFAULT 'niche-quiz',
	`status` enum('subscribed','unsubscribed','bounced','pending') NOT NULL DEFAULT 'pending',
	`tags` json,
	`unsubscribedAt` timestamp,
	`subscribedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscribers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `account_credentials` ADD CONSTRAINT `account_credentials_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `email_reminders` ADD CONSTRAINT `email_reminders_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quiz_progress` ADD CONSTRAINT `quiz_progress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `referral_payments` ADD CONSTRAINT `referral_payments_referralId_referrals_id_fk` FOREIGN KEY (`referralId`) REFERENCES `referrals`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_referrerId_users_id_fk` FOREIGN KEY (`referrerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_applicantId_onboarding_applications_id_fk` FOREIGN KEY (`applicantId`) REFERENCES `onboarding_applications`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscribers` ADD CONSTRAINT `subscribers_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;