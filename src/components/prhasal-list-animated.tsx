"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PrhasalCard from "./prhasal-card";
import { getPrhasalsPaginated } from "@/actions/prhasals";
import { Loader2 } from "lucide-react";
import SearchBar from "./search-bar";

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
  const [isSearching, setIsSearching] = useState(false);

  const hasMore = !isSearching && phrasals.length < totalCount;

  // 🧭 Load More handler
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

  // 🔍 Diterima dari SearchBar
  const handleSearchResults = (results: PhrasalType[]) => {
    setPhrasals(results);
    setIsSearching(true);
  };

  const handleSearchStart = () => {
    setIsSearching(true);
  };

  // 🔁 Reset ke data awal (ketika query dikosongkan)
  const handleResetToInitial = () => {
    startTransition(async () => {
      const data = await getPrhasalsPaginated(LIMIT, 0);
      setPhrasals(data);
      setIsSearching(false);
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <SearchBar
        onSearchResults={handleSearchResults}
        onSearchStart={handleSearchStart}
        onResetToInitial={handleResetToInitial} // ✅ Tambahan penting
      />

      <p className="text-center text-lg capitalize pt-2 font-light">
        List of my phrasals
      </p>

      {/* List of phrasals */}
      {phrasals.length === 0 && (
        <p className="text-center text-muted-foreground mt-4">
          No results found.
        </p>
      )}

      {phrasals.map((phrasal) => (
        <motion.div
          key={phrasal.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PrhasalCard phrasal={phrasal} />
        </motion.div>
      ))}

      {/* Load more */}
      {hasMore && (
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
      )}

      {!hasMore && !isSearching && phrasals.length > 0 && (
        <p className="text-center py-4">
          <span className="bg-fuchsia-600 px-5 py-1 rounded-full">
            You’ve reached the end! 😎
          </span>
        </p>
      )}
    </div>
  );
}
