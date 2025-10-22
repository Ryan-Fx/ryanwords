import { getPrhasalsPaginated, getTotalCount } from "@/actions/prhasals";
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
    <div className="bg-foreground text-primary-foreground min-h-screen px-4 py-6 lg:py-14 lg:px-16">
      <section className="space-y-4">
        <div className="flex justify-center">
          <Button
            className="bg-pink-600 hover:bg-pink-700 w-full text-lg font-light rounded-full"
            asChild
          >
            <Link href="/add">Add New Phrasal</Link>
          </Button>
        </div>
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
