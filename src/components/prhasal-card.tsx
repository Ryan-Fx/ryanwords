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
      className="flex justify-between items-center bg-secondary-foreground space-x-2 lg:space-x-4 p-1 lg:p-2 lg:text-lg cursor-pointer"
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
