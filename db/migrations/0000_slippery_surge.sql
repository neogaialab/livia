CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"picture" varchar,
	"email" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
