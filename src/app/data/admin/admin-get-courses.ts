import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetCourses() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await requireAdmin();

  const data = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      level: true,
      status: true,
      price: true,
      fileKey: true,
      slug: true,
      category: true,
      description: true,
    },
  });

  return data;
}

export type AdminCoursesType = Awaited<ReturnType<typeof adminGetCourses>>[0];
