import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";
import { redirect } from "next/navigation";

interface CourseSlugLayoutProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseSlugPage({
  params,
}: CourseSlugLayoutProps) {
  const { slug } = await params;

  const course = await getCourseSidebarData(slug);

  const firstChapter = course.chapter[0];
  const firstLesson = firstChapter.lesson[0];

  if (firstLesson) {
    redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }

  return (
    <div className="flex items-center justify-center text-center h-full">
      <h2 className="text-2xl font-bold mb-2">No Lesson Found </h2>
      <p className="text-muted-foreground">
        This course does not have any lesson yet
      </p>
    </div>
  );
}
