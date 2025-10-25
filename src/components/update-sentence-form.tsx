"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { PrhasalInput, prhasalSchema } from "@/schema/prhasal";
import { updatePrhasal } from "@/actions/prhasals";
import toast from "react-hot-toast";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";

interface PrhasalEditFormProps {
  id: number;
  english: string;
  indo: string;
}

export default function UpdateSentenceForm({
  id,
  english,
  indo,
}: PrhasalEditFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<PrhasalInput>({
    resolver: zodResolver(prhasalSchema),
    defaultValues: {
      english,
      indo,
    },
  });

  const onSubmit = (values: PrhasalInput) => {
    startTransition(async () => {
      try {
        await updatePrhasal(id, values);
        toast.success("Sentence updated successfully! ✨");
        setIsOpen(false);
        router.refresh(); // kembali ke home
      } catch (error: any) {
        toast.error("Failed to update sentence!");
        console.error(error);
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-cyan-500 hover:bg-cyan-600">Edit</Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 text-slate-100 border-slate-700 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-center">Update Sentence</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 text-lg md:text-xl"
          >
            <FormField
              control={form.control}
              name="english"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-pink-400">
                    English
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={20}
                      className="ring-1 ring-cyan-500 min-h-16 text-lg md:text-xl"
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
                  <FormLabel className="text-lg text-sky-400">
                    Indonesian
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={20}
                      className="ring-1 ring-pink-500 min-h-16 text-lg md:text-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-fuchsia-500 hover:bg-fuchsia-600 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                disabled={isPending}
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Saving...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
