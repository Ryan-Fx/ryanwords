import { getPhrasalById } from "@/actions/prhasals";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import DeletePhrasal from "@/components/delete-phrasal";
import { auth } from "@clerk/nextjs/server";

export default async function PrhasalDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  const { id } = await params;

  const data = await getPhrasalById(Number(id));

  const createdAt = new Date(data.createdAt!);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  if (userId !== process.env.OWNER_ID) {
    return (
      <main className="min-h-screen max-w-3xl mx-auto p-6 flex items-center justify-center">
        <div>
          <h1 className="text-2xl text-muted-foreground font-semibold mb-4">
            Unauthorized
          </h1>
          <p>Sorry, you are not allowed to view this page.</p>
          <Button asChild variant="default">
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <div className="text-primary-foreground pt-[170px] lg:pt-[210px] min-h-screen px-4 py-6 space-y-6">
      <h1 className="text-center text-2xl font-semibold tracking-tighter text-purple-500 capitalize">
        My phrasal detail 🎉
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
          <p className="text-fuchsia-400 font-semibold tracking-wide italic">
            In english :{" "}
          </p>
          <p className="text-gray-300 font-light">{data.english}</p>
        </div>
        <div className="bg-secondary-foreground p-4 rounded-sm">
          <p className="text-pink-400 font-semibold tracking-wide italic">
            In indonesian :{" "}
          </p>
          <p className="text-slate-300 font-light">{data.indo}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <DeletePhrasal id={Number(id)} />
        <Button className="bg-purple-600 hover:bg-purple-700" asChild>
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
