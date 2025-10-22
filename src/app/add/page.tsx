import PrhasalForm from "@/components/prhasal-form";
import React from "react";

export default function AddPage() {
  return (
    <div className="bg-foreground text-primary-foreground min-h-screen space-y-6 p-4 lg:p-10">
      <header className="text-center space-y-2">
        <p className="text-muted-foreground font-light text-lg">
          Please fill out the form below! 👇
        </p>
      </header>

      <section>
        <PrhasalForm />
      </section>
    </div>
  );
}
