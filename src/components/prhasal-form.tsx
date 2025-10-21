"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PrhasalInput, prhasalSchema } from "@/schema/prhasal";
import { createPrhasal } from "@/actions/prhasals";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function PrhasalForm() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<PrhasalInput>({
    resolver: zodResolver(prhasalSchema),
    defaultValues: {
      english: "",
      indo: "",
    },
  });

  const onSubmit = (values: PrhasalInput) => {
    startTransition(async () => {
      try {
        await createPrhasal(values);
        toast.success("Nice! Your prhasal has been created!😎");
        form.reset();
        router.refresh();
      } catch (error: any) {
        toast.error("Something went wrong, please try again!");
        console.error("Failed to send message:", error);
      }
    });
  };

  return (
    <div className="">
      <div className={cn("col-span-4", poppins.className)}>
        {" "}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 lg:text-2xl"
          >
            <FormField
              control={form.control}
              name="english"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={20}
                      className="ring-1 ring-cyan-500 min-h-16"
                      placeholder="Just type whatever you want lol"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="indo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indo</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={20}
                      className="ring-1 ring-cyan-500 min-h-16"
                      placeholder="Translate it to indo"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-x-2">
              <Button
                disabled={isPending}
                type="submit"
                className="cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Prhasal"
                )}
              </Button>
              <Button>
                <Link href="/">Go Back Home</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
