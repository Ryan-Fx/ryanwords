"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="text-center bg-foreground space-y-6 p-4">
      <h1 className="lg:text-3xl text-2xl font-light tracking-wider text-cyan-500">
        Ryan English Phrasals!
      </h1>

      {pathname !== "/add" && (
        <Button
          className="bg-sky-600 hover:bg-sky-700 w-full text-lg font-light rounded-full"
          asChild
        >
          <Link href="/add">Add New Phrasal</Link>
        </Button>
      )}
    </header>
  );
}
