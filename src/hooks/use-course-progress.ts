"use client";

import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";
import { useMemo } from "react";

interface props {
  courseData: CourseSidebarDataType;
}

interface CourseProgressResult {
  totalLesson: number;
  completedLessons: number;
  progressPercentage: number;
}

export function useCourseProgress({ courseData }: props): CourseProgressResult {
  return useMemo(() => {
    let totalLesson = 0;
    let completedLessons = 0;

    courseData.chapter.forEach((chapter) => {
      chapter.lesson.forEach((lesson) => {
        totalLesson++;

        // check if the lesson is completed
        const isCompleted = lesson.lessonProgress.some(
          (progress) => progress.lessonId === lesson.id && progress.completed
        );

        if (isCompleted) completedLessons++;
      });
    });

    const progressPercentage =
      totalLesson > 0 ? Math.round((completedLessons / totalLesson) * 100) : 0;

    return { totalLesson, completedLessons, progressPercentage };
  }, [courseData]);
}
