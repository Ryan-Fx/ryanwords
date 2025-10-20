import { getPrhasalsPaginated, getTotalCount } from "@/actions/prhasals";
import PrhasalForm from "@/components/prhasal-form";
import PhrasalListAnimated from "@/components/prhasal-list-animated";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const LIMIT = 5;

  const [initialData, totalCount] = await Promise.all([
    getPrhasalsPaginated(LIMIT, 0),
    getTotalCount(),
  ]);

  return (
    <div className="bg-foreground text-primary-foreground min-h-screen space-y-6 p-4 lg:p-10">
      <header className="text-center space-y-2">
        <h1 className="lg:text-3xl text-2xl font-semibold text-slate-50">
          Ryan English Phrasals!
        </h1>

        <Button asChild>
          <Link
            href="/add"
            className="text-muted-foreground text-sm lg:text-base"
          >
            Add New Phrasal
          </Link>
        </Button>
      </header>

      <section>
        <PhrasalListAnimated
          initialData={initialData}
          totalCount={totalCount}
        />
      </section>
    </div>
  );
}
