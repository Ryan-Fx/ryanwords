import PrhasalForm from "@/components/prhasal-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default async function AddPage() {
  const { userId } = await auth();

  if (userId !== process.env.OWNER_ID) {
    return (
      <main className="min-h-screen max-w-2xl mx-auto flex items-center justify-center">
        <div className="text-center space-y-5 bg-pink-500 p-6 rounded-lg">
          <h1 className="text-2xl text-gray-800 font-semibold mb-4">
            Unauthorized!
          </h1>
          <p className="text-slate-800 text-lg">
            Sorry, you are not allowed to view this page
          </p>
          <Button asChild variant="default">
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <div className="text-primary-foreground pt-[170px] lg:pt-[210px] min-h-screen space-y-6 p-4 lg:p-10">
      <header className="text-center space-y-2">
        <p
          className={cn("text-sky-400 text-xl lg:text-2xl", poppins.className)}
        >
          Please fill out the form below! 👇
        </p>
      </header>

      <section>
        <PrhasalForm />
      </section>
    </div>
  );
}
