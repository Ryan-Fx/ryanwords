"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import PrhasalCard from "./prhasal-card";
import { getPrhasalsPaginated } from "@/actions/prhasals";

interface PhrasalType {
  id: number;
  indo: string;
  english: string;
  createdAt: Date | null;
}

const LIMIT = 4;

interface Props {
  initialData: PhrasalType[];
  totalCount: number;
}

export default function PhrasalListAnimated({
  initialData,
  totalCount,
}: Props) {
  const [phrasals, setPhrasals] = useState<PhrasalType[]>(initialData);
  const [isPending, startTransition] = useTransition();

  const hasMore = phrasals.length < totalCount;

  async function handleLoadMore() {
    startTransition(async () => {
      try {
        const offset = phrasals.length;
        const newData = await getPrhasalsPaginated(LIMIT, offset);
        setPhrasals((prev) => [...prev, ...newData]);
      } catch (error) {
        console.error("❌ Failed to load more data:", error);
      }
    });
  }

  return (
    <div className="space-y-4">
      {phrasals.map((phrasal) => (
        <motion.div
          key={phrasal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PrhasalCard phrasal={phrasal} />
        </motion.div>
      ))}

      {hasMore ? (
        <div className="flex justify-center">
          <Button
            onClick={handleLoadMore}
            disabled={isPending}
            className="w-full max-w-sm cursor-pointer"
          >
            {isPending ? "Loading..." : "See more"}
          </Button>
        </div>
      ) : (
        phrasals.length > 0 && (
          <p className="text-center text-muted-foreground py-4">
            You’ve reached the end 🎉
          </p>
        )
      )}
    </div>
  );
}
