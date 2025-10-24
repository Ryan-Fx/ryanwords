"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Typewriter } from "nextjs-simple-typewriter";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="text-center fixed left-0 top-0 z-20 right-0 rounded-bl-full rounded-tl-full rounded-br-full p-4 m-4 bg-[url('/assets/bgtext.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex items-center justify-between lg:pr-10">
        <div className="flex items-center justify-start space-x-4">
          <Link href="/">
            <Image
              src="/assets/okeejoss.png"
              width={130}
              height={130}
              alt="Logo"
              className="rounded-full size-20 lg:size-[130px] border-2 lg:border-4 border-pink-500"
            />
          </Link>
          <h1 className="text-md lg:text-4xl bg-linear-to-r font-semibold from-purple-500 via-yellow-400 to-yellow-400 bg-clip-text text-transparent">
            <Typewriter
              words={[
                "Hi! Ryan here!✨",
                "Learn new vocabularies!",
                "Make new sentences!✨",
                "Learn new phrases!✨",
                "Learn new idioms!✨",
                "Learn new phrasal verbs!",
              ]}
              loop={0} // infinite loop
              cursor={false} // tampilkan cursor
              cursorStyle="|" // style cursor
              typeSpeed={90} // kecepatan mengetik
              deleteSpeed={40} // kecepatan menghapus
              delaySpeed={2000} // jeda antar kata
            />
            <span className="ml-1 text-white animate-caret-blink">|</span>
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
