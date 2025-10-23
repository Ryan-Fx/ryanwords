import { getPrhasalsPaginated, getTotalCount } from "@/actions/prhasals";
import ScrollToTopButton from "@/components/btn/scroll-to-top-btn";
import PhrasalListAnimated from "@/components/prhasal-list-animated";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCircleUp } from "react-icons/fa6";

export default async function Home() {
  const LIMIT = 5;

  const [initialData, totalCount] = await Promise.all([
    getPrhasalsPaginated(LIMIT, 0),
    getTotalCount(),
  ]);

  return (
    <div
      id="top"
      className="text-primary-foreground pt-40 relative lg:pt-[210px] min-h-screen px-4 py-6  lg:px-16"
    >
      <section className="space-y-4">
        <div className="flex justify-center">
          <Button
            className="bg-pink-500 hover:bg-pink-600 w-full text-lg font-light py-5 lg:py-6 rounded-lg"
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
        <div>
          <ScrollToTopButton />
        </div>
      </section>
    </div>
  );
}
