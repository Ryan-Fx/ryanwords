import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function RegisterPage() {
  return (
    <main className="flex justify-center items-center h-screen bg-foreground pt-[170px] lg:pt-[210px]">
      {/* <Image src="/assets/logo.svg" width={100} height={100} alt="Logo" /> */}
      <div>
        <SignUp />
      </div>
    </main>
  );
}
