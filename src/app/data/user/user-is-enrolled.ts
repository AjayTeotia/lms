import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function checkIsCourseBought(courseId: string): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return false;

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      courseId_userId: {
        userId: session.user.id,
        courseId: courseId,
      },
    },
    select: {
      status: true,
    },
  });

  return enrollment?.status === "ACTIVE" ? true : false;
}
