"use client";

import { EnrolledCourseType } from "@/app/data/user/get-enrolled-course";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { useCourseProgress } from "@/hooks/use-course-progress";
import Image from "next/image";
import Link from "next/link";

interface props {
  data: EnrolledCourseType[number];
}

export function CourseProgressCard({ data }: props) {
  const thumbnailUrl = useConstructUrl(data.course.fileKey);
  const { totalLesson, completedLessons, progressPercentage } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useCourseProgress({ courseData: data.course as any });

  return (
    <Card className="group relative gap-0 py-0">
      <Badge className="absolute top-2 right-2 z-10">{data.course.level}</Badge>

      <Image
        src={thumbnailUrl}
        alt="Thumbnail Image"
        width={600}
        height={400}
        className="aspect-video w-full h-full object-cover rounded-t-xl"
      />

      <CardContent className="p-4">
        <Link
          href={`/dashboard/${data.course.slug}`}
          className="text-lg font-medium line-clamp-2 hover:underline hover:text-primary transition-colors"
        >
          {data.course.title}
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.course.smallDescription}
        </p>

        <div className="space-y-4 mt-5">
          <div className="flex justify-between mb-1 text-sm">
            <p>Progress: </p>
            <p className="font-medium">{progressPercentage}%</p>
          </div>

          <Progress value={progressPercentage} className="h-1.5" />

          <p className="text-xs text-muted-foreground mt-1">
            {completedLessons} of {totalLesson} Lessons Completed
          </p>
        </div>

        <Link
          href={`/dashboard/${data.course.slug}`}
          className={buttonVariants({ className: "mt-4 w-full" })}
        >
          Learn More
        </Link>
      </CardContent>
    </Card>
  );
}
