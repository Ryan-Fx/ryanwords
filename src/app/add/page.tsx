import PrhasalForm from "@/components/prhasal-form";
import React from "react";

export default function AddPage() {
  return (
    <div className="bg-foreground text-primary-foreground min-h-screen space-y-6 p-4 lg:p-10">
      <header className="text-center space-y-2">
        <h1 className="lg:text-3xl text-2xl font-semibold text-slate-50">
          Ryan English Phrasals!
        </h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          Please fill out the form below 👇
        </p>
      </header>

      <section>
        <PrhasalForm />
      </section>
    </div>
  );
}
