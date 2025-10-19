"use server";

import { db } from "@/drizzle/db";
import { prhasalsTable } from "@/drizzle/schema";
import { PrhasalInput, prhasalSchema } from "@/schema/prhasal";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createPrhasal(formData: PrhasalInput) {
  const { success, data } = prhasalSchema.safeParse(formData);
  if (!success) {
    throw new Error("Validation failed");
  }

  try {
    await db.insert(prhasalsTable).values(data);
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(`Error creating prhasal: ${error.message || error} `);
  }
}

export async function getPrhasals() {
  try {
    const prhasals = await db
      .select()
      .from(prhasalsTable)
      .orderBy(desc(prhasalsTable.createdAt));

    return prhasals;
  } catch (error: any) {
    throw new Error(`Error getting prhasals: ${error.message || error} `);
  }
}

export async function deletePrhasal(id: number) {
  try {
    await db.delete(prhasalsTable).where(eq(prhasalsTable.id, id));
    revalidatePath("/message");
  } catch (error: any) {
    throw new Error(`Error deleting message: ${error.message || error} `);
  }
}
