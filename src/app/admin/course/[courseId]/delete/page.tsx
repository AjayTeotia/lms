"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteCourse } from "./action";
import { tryCatch } from "@/hooks/try-catch";
import { useParams, useRouter } from "next/navigation";
import { LoaderIcon, Trash2Icon } from "lucide-react";

export default function DeleteCoursePage() {
  const [isPending, startTransition] = useTransition();
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId));

      if (error) {
        toast.error("Failed to create course. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        router.push("/admin/course");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="max-w-xl mx-auto w-full">
      <Card className="mt-36">
        <CardHeader>
          <CardTitle>Are you sure you want to delete this course?</CardTitle>

          <CardDescription>This action cannot be undone</CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-end gap-2">
          <Link
            href="/admin/course"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>

          <Button
            type="submit"
            onClick={onSubmit}
            variant="destructive"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <LoaderIcon className="mr-2 animate-spin" /> Deleting...
              </>
            ) : (
              <>
                <Trash2Icon className="ml-1" size={16} />
                Delete Course
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
