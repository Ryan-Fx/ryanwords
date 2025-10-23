import PrhasalForm from "@/components/prhasal-form";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

export default async function AddPage() {
  const { userId } = await auth();

  if (userId !== process.env.OWNER_ID) {
    return (
      <main className="min-h-screen max-w-3xl mx-auto p-6 flex items-center justify-center">
        <div>
          <h1 className="text-2xl text-muted-foreground font-semibold mb-4">
            Unauthorized
          </h1>
          <p>Sorry, you are not allowed to view this page.</p>
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
        <p className="text-muted-foreground font-light text-lg lg:text-2xl">
          Please fill out the form below! 👇
        </p>
      </header>

      <section>
        <PrhasalForm />
      </section>
    </div>
  );
}
