"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  })
);

export async function deleteCourse(courseId: string): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const req = await request();

    const decision = await aj.protect(req, {
      fingerprints: session?.user.id as string,
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

    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    revalidatePath("/admin/course");

    return {
      status: "success",
      message: "Course deleted successfully.",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to delete course. Please try again later.",
    };
  }
}
