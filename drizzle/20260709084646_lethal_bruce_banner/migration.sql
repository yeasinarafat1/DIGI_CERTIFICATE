CREATE TABLE "admins" (
	"id" serial PRIMARY KEY,
	"username" varchar(50) NOT NULL UNIQUE,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY,
	"student_id" varchar(30) NOT NULL UNIQUE,
	"name" text NOT NULL,
	"course_name" text NOT NULL,
	"batch_no" varchar(20) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
