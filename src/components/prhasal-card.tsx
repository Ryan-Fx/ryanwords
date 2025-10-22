import { useRouter } from "next/navigation";

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
      className="flex justify-between items-center bg-secondary-foreground space-x-2 lg:space-x-4 p-2 lg:p-4 lg:text-lg cursor-pointer rounded-md lg:hover:scale-105 transition-all duration-300 ease-in-out"
    >
      <div className="w-full space-y-1">
        <p className="text-sky-400 text-justify">{phrasal.english}</p>
        <p className="text-slate-200 font-thin italic text-justify">
          {phrasal.indo}
        </p>
      </div>
    </div>
  );
}
