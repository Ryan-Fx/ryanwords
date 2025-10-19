import { z } from "zod";

export const prhasalSchema = z.object({
  english: z.string().min(1, "Must be at least 1 character"),
  indo: z.string().min(1, "Must be at least 1 character"),
});

// TypeScript helper
export type PrhasalInput = z.infer<typeof prhasalSchema>;
