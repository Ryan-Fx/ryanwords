import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";
import { useRouter } from "next/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

interface PrhasalCardProps {
  phrasal: {
    id: number;
    indo: string;
    english: string;
    createdAt: Date | null;
  };
}

export default function PrhasalCard({ phrasal }: PrhasalCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/phrasal/${phrasal.id}`)}
      className="flex justify-between items-center bg-secondary-foreground space-x-2 lg:space-x-4 p-2 lg:p-4 text-xl cursor-pointer rounded-md lg:hover:scale-105 transition-all duration-300 ease-in-out"
    >
      <div className={cn("w-full space-y-1", roboto.className)}>
        <p className="text-pink-400 font-semibold text-justify">
          {phrasal.english}
        </p>
        <p className="text-slate-200 text-justify">{phrasal.indo}</p>
      </div>
    </div>
  );
}
