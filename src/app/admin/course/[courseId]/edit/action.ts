"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zod-schema";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    })
  );

export async function editCourse(
  data: CourseSchemaType,
  courseId: string
): Promise<ApiResponse> {
  const user = await requireAdmin();

  try {
    const req = await request();

    const decision = await aj.protect(req, {
      fingerprints: user?.user.id as string,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "You have been blocked due to too many requests.",
        };
      } else {
        return {
          status: "error",
          message: "You are bot! if you are not a bot, please try again.",
        };
      }
    }

    const result = courseSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid data. Please try again.",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id,
      },
      data: {
        ...result.data,
      },
    });

    return {
      status: "success",
      message: "Course updated successfully.",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to update course. Please try again.",
    };
  }
}

export async function reorderLesson(
  chapterId: string,
  lessons: {
    id: string;
    position: number;
  }[],
  courseId: string
): Promise<ApiResponse> {
  await requireAdmin();

  try {
    if (!lessons || lessons.length === 0) {
      return {
        status: "error",
        message: "No lessons to reorder. Please try again.",
      };
    }

    const lessonUpdates = lessons.map((lesson) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
          chapterId: chapterId,
        },
        data: {
          position: lesson.position,
        },
      })
    );

    await prisma.$transaction(lessonUpdates);

    revalidatePath(`/admin/course/${courseId}/edit`);

    return {
      status: "success",
      message: "Lessons reordered successfully.",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to reorder lessons. Please try again.",
    };
  }
}

export async function reorderChapter(
  courseId: string,
  chapters: { id: string; position: number }[]
): Promise<ApiResponse> {
  await requireAdmin();

  try {
    if (!chapters || chapters.length === 0) {
      return {
        status: "error",
        message: "No chapters to reorder. Please try again.",
      };
    }

    const chapterUpdates = chapters.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId: courseId,
        },
        data: {
          position: chapter.position,
        },
      })
    );

    await prisma.$transaction(chapterUpdates);

    revalidatePath(`/admin/course/${courseId}/edit`);

    return {
      status: "success",
      message: "Chapters reordered successfully.",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to reorder chapters. Please try again.",
    };
  }
}
