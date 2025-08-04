"use client";

import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rich-text-editor/render-description";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { BookIcon, CheckCircleIcon, LoaderIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { markLessonCompleted } from "../action";
import { useConfetti } from "@/hooks/use-confetti";

interface props {
  data: LessonContentType;
}

export function CourseContent({ data }: props) {
  const [isPending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  function VideoPlayer({
    thumbnailKey,
    videoKey,
  }: {
    thumbnailKey: string;
    videoKey: string;
  }) {
    const videoUrl = useConstructUrl(videoKey);
    const thumbnailUrl = useConstructUrl(thumbnailKey);

    console.log(videoUrl, thumbnailUrl);

    if (!videoKey) {
      return (
        <div className="aspect-video bg-accent rounded-lg flex flex-col items-center justify-center">
          <BookIcon className="size-16 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">
            This lesson does not have a video yet
          </p>
        </div>
      );
    }

    return (
      <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
        <video
          controls
          className="w-full h-full object-cover"
          poster={thumbnailUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
          <source src={videoUrl} type="video/ogv" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonCompleted(data.id, data.chapter.course.slug)
      );

      if (error) {
        toast.error("Failed to create course. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="flex flex-col h-full bg-background pl-6">
      <VideoPlayer
        thumbnailKey={data.thumbnailUrl ?? ""}
        videoKey={data.videoUrl ?? ""}
      />

      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button
            variant="outline"
            className="bg-green-500/10 text-green-500 hover:text-green-600"
            disabled
          >
            <CheckCircleIcon className="size-4 mr-2 text-green-500" /> Completed
          </Button>
        ) : (
          <Button variant="outline" onClick={onSubmit} disabled={isPending}>
            {isPending ? (
              <>
                <LoaderIcon className="mr-2 size-4 animate-spin" />
                Completing...
              </>
            ) : (
              <>
                <CheckCircleIcon className="size-4 mr-2 text-green-500" />
                Mark as completed
              </>
            )}
          </Button>
        )}
      </div>

      <div className="space-y-3 pt-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {data.title}
        </h1>

        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
}
