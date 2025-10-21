"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PrhasalCard from "./prhasal-card";
import { getPrhasalsPaginated } from "@/actions/prhasals";
import { Loader2 } from "lucide-react";

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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PrhasalCard phrasal={phrasal} />
        </motion.div>
      ))}

      {hasMore ? (
        <div className="flex justify-center">
          <Button
            onClick={handleLoadMore}
            disabled={isPending}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-600 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" /> Loading
              </>
            ) : (
              "See more"
            )}
          </Button>
        </div>
      ) : (
        phrasals.length > 0 && (
          <p className="text-center py-4">
            <span className="bg-fuchsia-600 px-5 py-1 rounded-full">
              {" "}
              You’ve reached the end! 😎
            </span>
          </p>
        )
      )}
    </div>
  );
}
