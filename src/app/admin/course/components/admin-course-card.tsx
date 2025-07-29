import { AdminCoursesType } from "@/app/data/admin/admin-get-courses";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConstructUrl } from "@/hooks/use-construct-url";
import {
  ArrowRightIcon,
  EyeIcon,
  MoreVerticalIcon,
  PencilIcon,
  SchoolIcon,
  TimerIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AdminCourseCardProps {
  data: AdminCoursesType;
}

export function AdminCourseCard({ data }: AdminCourseCardProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);

  return (
    <Card className="group relative py-0 gap-0">
      {/* absolute dropdown */}
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/course/${data.id}/edit`}>
                <PencilIcon className="mr-2 size-4" />
                Edit Course
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={`course/${data.slug}`}>
                <EyeIcon className="mr-2 size-4" />
                Preview
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem variant="destructive" asChild>
              <Link href={`course/${data.slug}`}>
                <Trash2Icon className="mr-2 size-4" />
                Delete Course
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Image
        src={thumbnailUrl}
        alt="Thumbnail"
        width={600}
        height={400}
        className="w-full rounded-t-lg aspect-video h-full object-cover"
      />

      <CardContent className="p-4">
        <Link
          href={`/admin/course/${data.id}/edit`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {data.title}
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground mt-2 leading-tight">
          {data.smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="p-1 size-6 rounded-md text-primary bg-primary/10" />

            <p className="text-sm text-muted-foreground">{data.duration} h</p>
          </div>

          <div className="flex items-center gap-x-2">
            <SchoolIcon className="p-1 size-6 rounded-md text-primary bg-primary/10" />

            <p className="text-sm text-muted-foreground">{data.level}</p>
          </div>
        </div>

        <Link
          href={`/admin/course/${data.id}/edit`}
          className={buttonVariants({ className: "w-full mt-4" })}
        >
          Edit Course <ArrowRightIcon />
        </Link>
      </CardContent>
    </Card>
  );
}
