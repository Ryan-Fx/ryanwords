import { getPhrasalById } from "@/actions/prhasals";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import DeletePhrasal from "@/components/delete-phrasal";
import { auth } from "@clerk/nextjs/server";
import { Poppins, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import UpdateSentenceForm from "@/components/update-sentence-form";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

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
      <main className="min-h-screen max-w-2xl mx-auto flex items-center justify-center">
        <div className="text-center space-y-5 bg-pink-500 p-6 rounded-lg">
          <h1 className="text-2xl text-gray-800 font-semibold mb-4">
            Unauthorized!
          </h1>
          <p className="text-slate-800 text-lg">
            Sorry, you are not allowed to view this page
          </p>
          <Button asChild variant="default">
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <div className="text-primary-foreground pt-[170px] lg:pt-[210px] min-h-screen px-4 py-6 space-y-6">
      <h1
        className={cn(
          "text-center text-2xl text-sky-400 capitalize",
          poppins.className
        )}
      >
        My sentence detail 🎉
      </h1>

      {/* date */}
      <p className={cn("text-sm text-sky-600", roboto.className)}>
        Created at :{" "}
        {createdAt.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}{" "}
        <span>({timeAgo})</span>
      </p>
      <div className={cn("space-y-4 text-xl text-justify", roboto.className)}>
        <div className="bg-secondary-foreground p-4 rounded-sm">
          <p className="text-fuchsia-400 font-semibold tracking-wide italic">
            In english :{" "}
          </p>
          <p className="text-pink-400 font-semibold">{data.english}</p>
        </div>
        <div className="bg-secondary-foreground p-4 rounded-sm">
          <p className="text-fuchsia-400 font-semibold tracking-wide italic">
            In indonesian :{" "}
          </p>
          <p className="text-slate-300">{data.indo}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <DeletePhrasal id={Number(id)} />
          <UpdateSentenceForm
            id={Number(id)}
            english={data.english}
            indo={data.indo}
          />
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" asChild>
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
