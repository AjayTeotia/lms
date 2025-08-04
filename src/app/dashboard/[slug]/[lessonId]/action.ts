"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { revalidatePath } from "next/cache";

export async function markLessonCompleted(
  lessonId: string,
  slug: string
): Promise<ApiResponse> {
  const session = await requireUser();

  try {
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          lessonId: lessonId,
          userId: session.user.id,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId: session.user.id,
        lessonId: lessonId,
        completed: true,
      },
    });

    revalidatePath(`/dashboard/${slug}`);

    return {
      status: "success",
      message: "Lesson marked as completed successfully.",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to mark lesson as completed. Please try again.",
    };
  }
}
