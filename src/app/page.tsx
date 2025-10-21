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
    <div className="bg-foreground text-primary-foreground min-h-screen px-2 py-6 lg:py-10 lg:px-10">
      <section>
        {initialData.length == 0 ? (
          <p className="text-center">There is no phrasal. Please add one</p>
        ) : (
          <PhrasalListAnimated
            initialData={initialData}
            totalCount={totalCount}
          />
        )}
      </section>
    </div>
  );
}
