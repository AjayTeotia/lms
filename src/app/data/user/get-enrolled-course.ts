import "server-only";
import { requireUser } from "./require-user";
import { prisma } from "@/lib/db";

export async function getEnrolledCourse() {
  const user = await requireUser();

  const data = await prisma.enrollment.findMany({
    where: {
      userId: user.user.id,
      status: "ACTIVE",
    },
    select: {
      course: {
        select: {
          id: true,
          smallDescription: true,
          title: true,
          fileKey: true,
          level: true,
          slug: true,
          duration: true,
          chapter: {
            select: {
              id: true,
              lesson: {
                select: {
                  id: true,
                  lessonProgress: {
                    where: {
                      userId: user.user.id,
                    },
                    select: {
                      id: true,
                      lessonId: true,
                      completed: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return data;
}

export type EnrolledCourseType = Awaited<ReturnType<typeof getEnrolledCourse>>;
