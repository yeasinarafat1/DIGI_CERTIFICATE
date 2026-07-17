CREATE TABLE "certificates" (
	"id" serial PRIMARY KEY,
	"certificate_id" varchar(30) NOT NULL UNIQUE,
	"name" text NOT NULL,
	"role" varchar(20) DEFAULT 'student' NOT NULL,
	"course_name" text NOT NULL,
	"batch_no" varchar(20) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
