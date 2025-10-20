import { PrhasalInput } from "@/schema/prhasal";
import { Button } from "./ui/button";

interface PrhasalCardProps {
  phrasal: {
    id: number;
    indo: string;
    english: string;
    createdAt: Date | null;
  };
}

export default function PrhasalCard({ phrasal }: PrhasalCardProps) {
  return (
    <div className="flex justify-between items-center bg-secondary-foreground space-x-2 lg:space-x-4 p-1 lg:p-2 lg:text-lg">
      <div className="w-full">
        <p className="text-sky-400">{phrasal.english}</p>
        <p className="text-slate-200 font-thin text italic">{phrasal.indo}</p>
      </div>
      <div>
        <Button className="bg-red-500 hover:bg-red-600 cursor-pointer">
          Remove
        </Button>
      </div>
    </div>
  );
}
