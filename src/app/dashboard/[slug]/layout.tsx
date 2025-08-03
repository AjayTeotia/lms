import { ReactNode } from "react";
import CourseSidebar from "../_components/course-sidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface CourseSlugLayoutProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function CourseSlugLayout({
  children,
  params,
}: CourseSlugLayoutProps) {
  const { slug } = await params;
  const courseData = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-1">
      {/* Sidebar: fixed width */}
      <div className="w-80 border-r border-border shrink-0">
        <CourseSidebar course={courseData} />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
