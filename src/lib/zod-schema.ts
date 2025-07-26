import { z } from "zod";

export const CourseLevel = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export const CourseStatus = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
  "Photography & Video",
  "Lifestyle",
  "Language",
  "Other",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must not exceed 100 characters" }),

  description: z.string().min(3, {
    message: "Description must be at least 3 characters long",
  }),

  fileKey: z.string().min(1, {
    message: "File key is required",
  }),

  price: z.coerce.number().min(1, { message: "Price must be positive number" }),

  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 hour" })
    .max(500, { message: "Duration must not exceed 500 hours" }),

  level: z.enum(CourseLevel, {
    message:
      "Level is required and must be one of: BEGINNER, INTERMEDIATE, ADVANCED",
  }),

  category: z.enum(courseCategories, {
    message:
      "Category is required and must be one of the predefined categories",
  }),

  smallDescription: z
    .string()
    .min(3, { message: "Small description must be at least 3 characters" })
    .max(200, { message: "Small description must not exceed 200 characters" }),

  slug: z.string().min(3, {
    message: "Slug must be at least 3 characters long",
  }),

  status: z.enum(CourseStatus, {
    message:
      "Status is required and must be one of: DRAFT, PUBLISHED, ARCHIVED",
  }),
});

export type CourseSchemaType = z.input<typeof courseSchema>;