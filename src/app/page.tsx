import { getPrhasalsPaginated, getTotalCount } from "@/actions/prhasals";
import ScrollToTopButton from "@/components/btn/scroll-to-top-btn";
import PhrasalListAnimated from "@/components/prhasal-list-animated";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default async function Home() {
  const LIMIT = 10;

  const [initialData, totalCount] = await Promise.all([
    getPrhasalsPaginated(LIMIT, 0),
    getTotalCount(),
  ]);

  return (
    <div
      id="top"
      className="text-primary-foreground pt-40 relative lg:pt-[210px] px-4 py-6  lg:px-16"
    >
      <section className="space-y-4">
        <div className={cn("flex justify-center", poppins.className)}>
          <Button
            className="bg-pink-500 hover:bg-pink-600 w-full text-lg py-5 lg:py-6 lg:text-2xl rounded-lg"
            asChild
          >
            <Link href="/add">Add new sentence</Link>
          </Button>
        </div>
        {initialData.length == 0 ? (
          <p className="text-center text-lg lg:text-2xl">
            There is no phrasal. Please add one
          </p>
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
