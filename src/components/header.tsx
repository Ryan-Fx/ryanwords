"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Typewriter } from "nextjs-simple-typewriter";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="text-center fixed left-0 top-0 z-20 right-0 rounded-lg p-4 m-4 bg-[url('/assets/bgtext.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start space-x-4">
          <Image
            src="/assets/bellalogo.jpg"
            width={130}
            height={130}
            alt="Logo"
            className="rounded-full size-[90px] lg:size-[130px] border-2 lg:border-4 border-pink-500"
          />
          <h1 className="text-xl lg:text-4xl bg-linear-to-r from-purple-400 via-pink-400 to-pink-500 bg-clip-text text-transparent">
            <Typewriter
              words={[
                "Learn new vocabularies everyday!",
                "Make new sentences everyday!",
                "Learn new phrases!",
                "Learn new idioms!",
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
