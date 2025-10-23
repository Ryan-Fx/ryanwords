"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Loader2, SearchSlashIcon } from "lucide-react";
import { searchPrhasals } from "@/actions/prhasals";

interface SearchBarProps {
  onSearchResults: (results: any[]) => void;
  onSearchStart?: () => void;
  onQueryChange?: (query: string) => void;
  onClearSearch?: () => void;
  onResetToInitial?: () => void; // ✅ Tambahan: trigger reset
}

export default function SearchBar({
  onSearchResults,
  onSearchStart,
  onQueryChange,
  onClearSearch,
  onResetToInitial,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebouncedCallback(async (value: string) => {
    const trimmed = value.trim();
    onQueryChange?.(value);

    // ✅ Jika input kosong → reset ke data awal
    if (trimmed === "") {
      onResetToInitial?.(); // panggil parent untuk reset data awal
      return;
    }

    // ✅ Jika ada input → jalankan pencarian
    onSearchStart?.();
    setLoading(true);
    try {
      const results = await searchPrhasals(trimmed, 10, 0);
      onSearchResults(results);
    } catch (error) {
      console.error("❌ Search error:", error);
    } finally {
      setLoading(false);
    }
  }, 400);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    debouncedSearch(val);
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder="Type to search phrasals..."
        value={query}
        onChange={handleChange}
        className="w-full pl-10 ring-1 ring-fuchsia-500"
      />
      <SearchSlashIcon className="absolute left-2 top-1/2 text-slate-300 -translate-y-1/2" />
      {loading && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-fuchsia-500" />
      )}
    </div>
  );
}
