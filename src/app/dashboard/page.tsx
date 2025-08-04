import { EmptyState } from "@/components/general/empty-state";
import { PublicCourseCard } from "../(home)/_components/public-course-card";
import { getAllCourses } from "../data/course/get-all-courses";
import { getEnrolledCourse } from "../data/user/get-enrolled-course";
import { CourseProgressCard } from "./_components/course-progress-card";

export default async function DashboardPage() {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourse(),
  ]);
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">
          Here you will see all of the courses you have enrolled in.
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState
          title="No Course Purchased"
          description="
      You have not enrolled in any course yet. Buy a course to get started."
          buttonText="Browse Courses"
          href="/course"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map(({ course }) => (
            <CourseProgressCard key={course.id} data={{ course }} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2 mb-5">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground">
            Here you will see all of the courses available on the platform.
          </p>
        </div>

        {courses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ course: enrolled }) => enrolled.id === course.id
            )
        ).length === 0 ? (
          <EmptyState
            title="No Course Available"
            description="
        There are no courses available at the moment. Check back later."
            buttonText="Browse Courses"
            href="/course"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ course: enrolled }) => enrolled.id === course.id
                  )
              )
              .map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
