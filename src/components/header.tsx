"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="text-center space-y-2 bg-foreground">
      <h1 className="lg:text-3xl text-2xl font-semibold text-slate-50">
        Ryan English Phrasals!
      </h1>

      {pathname !== "/add" && (
        <Button asChild>
          <Link
            href="/add"
            className="text-muted-foreground text-sm lg:text-base"
          >
            Add New Phrasal
          </Link>
        </Button>
      )}
    </header>
  );
}
