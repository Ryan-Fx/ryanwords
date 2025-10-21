"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BsTrash } from "react-icons/bs";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { deletePrhasal } from "@/actions/prhasals";
import { useRouter } from "next/navigation";

interface idProps {
  id: number;
}
export default function DeletePhrasal({ id }: idProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleDelete = (id: number) => {
    startTransition(async () => {
      try {
        await deletePrhasal(id);
        toast.success("Phrasal deleted successfully!");
        router.push("/");
      } catch (err: any) {
        alert("Failed to delete: " + err.message);
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"default"}
          type="button"
          title="Delete"
          className="cursor-pointer bg-rose-600 hover:bg-rose-700"
        >
          Delete Phrasal
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            message and remove it from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            disabled={isPending}
            onClick={() => handleDelete(id)}
            className="cursor-pointer"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
