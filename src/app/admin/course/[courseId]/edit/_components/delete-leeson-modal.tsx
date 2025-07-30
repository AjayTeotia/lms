import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteLesson } from "../action";
import { toast } from "sonner";

export function DeleteLessonModal({
  chapterId,
  courseId,
  lessonId,
}: {
  chapterId: string;
  courseId: string;
  lessonId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  async function onDelete() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        deleteLesson({
          chapterId,
          courseId,
          lessonId,
        })
      );

      if (error) {
        toast.error("Failed to delete lesson. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        setIsOpen(false);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <Button variant="destructive" size="icon">
          <Trash2Icon className="size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            lesson.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button disabled={pending} onClick={onDelete}>
            {pending ? (
              <>
                <LoaderIcon className="animate-spin size-4" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
