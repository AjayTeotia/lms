import "server-only";

import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function adminGetCourse(id: string) {
  await requireAdmin();

  const data = await prisma.course.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      status: true,
      smallDescription: true,
      slug: true,
      category: true,
      chapter: {
        select: {
          id: true,
          title: true,
          position: true,
          lesson: {
            select: {
              id: true,
              title: true,
              description: true,
              thumbnailUrl: true,
              position: true,
              videoUrl: true,
            },
          },
        },
      },
    },
  });

  if (!data) return notFound();

  return data;
}

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourse>>;
