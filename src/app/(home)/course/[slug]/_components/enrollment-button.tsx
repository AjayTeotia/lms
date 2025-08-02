"use client";

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { LoaderIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { enrollInCourseAction } from "../action";

export function EnrollmentButton({ courseId }: { courseId: string }) {
  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        enrollInCourseAction(courseId)
      );

      if (error) {
        toast.error("Failed to enroll in course. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Button disabled={isPending} onClick={onSubmit} className="w-full">
      {isPending ? (
        <>
          <LoaderIcon className="animate-spin size-4" /> Enrolling...
        </>
      ) : (
        "Enroll Now!"
      )}
    </Button>
  );
}
