"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="text-center bg-foreground p-10 bg-[url('/assets/bgtext.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start space-x-4">
          <Image
            src="/assets/bellalogo.jpg"
            width={130}
            height={130}
            alt="Logo"
            className="rounded-full size-[90px] lg:size-[130px] border-2 lg:border-4 border-pink-500"
          />
          <h1 className="lg:text-3xl text-xl font-semibold tracking-wider text-pink-500">
            Bella English Phrases ✨
          </h1>
        </div>
        <div className="flex items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
