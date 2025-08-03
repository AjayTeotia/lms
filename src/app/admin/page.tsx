import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { adminGetEnrollmentStats } from "../data/admin/admin-get-enrollment-stats";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { adminGetRecentCourses } from "../data/admin/admin-get-recent-cources";
import { EmptyState } from "@/components/general/empty-state";
import {
  AdminCourseCard,
  AdminCourseCardSkelton,
} from "./course/components/admin-course-card";
import { Suspense } from "react";

export default async function AdminPage() {
  const enrollmentData = await adminGetEnrollmentStats();

  return (
    <>
      <SectionCards />

      <ChartAreaInteractive data={enrollmentData} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Course</h2>
          <Link
            href="/admin/course"
            className={buttonVariants({ variant: "outline" })}
          >
            View All Courses
          </Link>
        </div>

        <Suspense fallback={<RenderRecentCoursesSkeltonLayout />}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  );
}

async function RenderRecentCourses() {
  const data = await adminGetRecentCourses();

  if (data.length === 0) {
    return (
      <EmptyState
        buttonText="Create new course"
        description="Create a new course to get started."
        href="/admin/course/create"
        title="No Course Found"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((course) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}

function RenderRecentCoursesSkeltonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <AdminCourseCardSkelton key={index} />
      ))}
    </div>
  );
}
