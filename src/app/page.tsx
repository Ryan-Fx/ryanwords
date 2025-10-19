import { getPrhasals } from "@/actions/prhasals";
import PrhasalCard from "@/components/prhasal-card";
import PrhasalForm from "@/components/prhasal-form";

export default async function Home() {
  const phrasals = await getPrhasals();
  return (
    <div className="bg-foreground text-primary-foreground min-h-screen space-y-4 p-2 lg:p-10">
      <h1 className="lg:text-3xl font-semibold text-center text-slate-50">
        Ryan English Prhasals!
      </h1>
      <div className="space-y-2">
        <h2 className="font-semibold lg:text-lg text-center">
          Please fill out the form below
        </h2>
        <PrhasalForm />
      </div>
      <div className="space-y-2 lg:space-y-4">
        <h2 className="font-semibold lg:text-3xl text-center">Phrasals list</h2>
        {phrasals.length === 0 ? (
          <p className="text-center text-slate-50">No phrasals found</p>
        ) : (
          phrasals.map((phrasal) => (
            <PrhasalCard key={phrasal.id} phrasal={phrasal} />
          ))
        )}
      </div>
    </div>
  );
}
