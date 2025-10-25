"use server";

import { db } from "@/drizzle/db";
import { prhasalsTable } from "@/drizzle/schema";
import { PrhasalInput, prhasalSchema } from "@/schema/prhasal";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, count, ilike, or } from "drizzle-orm";
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

export async function getPrhasalsPaginated(limit: number, offset: number) {
  try {
    const data = await db
      .select()
      .from(prhasalsTable)
      .orderBy(desc(prhasalsTable.createdAt))
      .limit(limit)
      .offset(offset);

    console.log(
      "✅ Rows fetched:",
      data.length,
      "limit:",
      limit,
      "offset:",
      offset
    );

    return data;
  } catch (error) {
    console.error("❌ Error fetching prhasals:", error);
    throw new Error("Failed to fetch prhasals");
  }
}

export async function getTotalCount() {
  try {
    const [{ total }] = await db.select({ total: count() }).from(prhasalsTable);
    console.log("📊 Total rows in database:", total);
    return total;
  } catch (error) {
    console.error("❌ Error counting prhasals:", error);
    throw new Error("Failed to get total count");
  }
}

export async function getPhrasalById(id: number) {
  try {
    const [prhasal] = await db
      .select()
      .from(prhasalsTable)
      .where(eq(prhasalsTable.id, id))
      .limit(1);

    return prhasal ?? null;
  } catch (error: any) {
    throw new Error(`Error getting prhasal: ${error.message || error} `);
  }
}

export async function updatePrhasal(id: number, formData: PrhasalInput) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated.");

    const { success, data } = prhasalSchema.safeParse(formData);
    if (!success) {
      throw new Error("Validation failed");
    }

    await db
      .update(prhasalsTable)
      .set({
        english: data.english,
        indo: data.indo,
      })
      .where(eq(prhasalsTable.id, id));

    // Revalidate homepage or list page
    revalidatePath("/phrasal");
  } catch (error: any) {
    throw new Error(`Error updating prhasal: ${error.message || error}`);
  }
}

export async function deletePrhasal(id: number) {
  try {
    await db.delete(prhasalsTable).where(eq(prhasalsTable.id, id));
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(`Error deleting prhasal: ${error.message || error} `);
  }
}

export async function searchPrhasals(
  query: string,
  limit: number,
  offset: number
) {
  try {
    const data = await db
      .select()
      .from(prhasalsTable)
      .where(
        or(
          ilike(prhasalsTable.english, `%${query}%`),
          ilike(prhasalsTable.indo, `%${query}%`)
        )
      )
      .orderBy(desc(prhasalsTable.createdAt))
      .limit(limit)
      .offset(offset);

    return data;
  } catch (error: any) {
    console.error("❌ Error searching phrasals:", error);
    throw new Error(`Error searching phrasals: ${error.message || error}`);
  }
}
