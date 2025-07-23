import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function CoursePage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>

        <Link href="/admin/course/create" className={buttonVariants()}>
          Create Course
        </Link>
      </div>

      <div>
        <h1>Here you will see all of the courses.</h1>
      </div>
    </>
  );
}
