CREATE TABLE "prhasals" (
	"id" serial PRIMARY KEY NOT NULL,
	"english" text NOT NULL,
	"indo" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
