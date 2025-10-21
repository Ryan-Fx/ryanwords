import { getPhrasalById } from "@/actions/prhasals";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import DeletePhrasal from "@/components/delete-phrasal";

export default async function PrhasalDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getPhrasalById(Number(id));

  const createdAt = new Date(data.createdAt!);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <div className="bg-foreground text-primary-foreground min-h-screen px-4 py-6 space-y-6">
      <h1 className="text-center text-2xl font-semibold text-cyan-400 capitalize">
        My phrasal detail!
      </h1>

      {/* date */}
      <p className="text-sm text-sky-600">
        Created at :{" "}
        {createdAt.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}{" "}
        <span>({timeAgo})</span>
      </p>
      <div className="space-y-4 text-xl text-justify">
        <div className="bg-secondary-foreground p-4 rounded-sm">
          <p className="text-teal-400 font-semibold underline decoration-wavy tracking-wide">
            In english :{" "}
          </p>
          <p className="text-gray-300 font-light">{data.english}</p>
        </div>
        <div className="bg-secondary-foreground p-4 rounded-sm">
          <p className="text-rose-400 font-semibold underline decoration-wavy tracking-wide">
            In indonesian :{" "}
          </p>
          <p className="text-slate-300 font-light">{data.indo}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <DeletePhrasal id={Number(id)} />
        <Button className="" asChild>
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
