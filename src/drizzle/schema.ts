import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const prhasalsTable = pgTable("prhasals", {
  id: serial("id").primaryKey(),
  english: text("english").notNull(),
  indo: text("indo").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
