import { z } from "zod";

// Create Phase Schema
export const createPhaseSchema = z.object({
  course: z.string().min(1, "Course title is required"),
  title: z.string().min(1, "Phase title is required"),
  display_title: z.string().min(1, "Display title is required"),
  description: z.string().min(6, "Description is required"),
  icon_url: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 1024 * 1024 * 5,
      "File size must be less than 5MB"
    ),
  order_number: z.number().min(1, "Phase order is required"),
});

export const createWeekSchema = z.object({
  courseTitle: z.string().min(6, "Course title is required"),
  phaseName: z.string().min(6, "Phase name is required"),
  weekTitle: z.string().min(5, "Week title is required"),
  groupSession: z.string().min(6, "Group session is required"),
  liveSession: z.string().min(6, "Live session is required"),
  order_number: z.number().min(1, "Week order is required"),
});

export const createClassSchema = z.object({
  courseTitle: z.string().min(6, "Course title is required"),
  phaseName: z.string().min(6, "Phase name is required"),
  weekName: z.string().min(6, "Week name is required"),
  classTopic: z.string().min(6, "Class topic is required"),
  description: z.string().min(6, "Description is required"),
});

export const createClassVideoSchema = z.object({
  courseTitle: z.string().min(1, "Course title is required"),
  phaseName: z.string().min(1, "Phase name is required"),
  weekName: z.string().min(1, "Week name is required"),
  selectClass: z.string().min(1, "Class selection is required"),
  classVideoTitle: z.string().min(1, "Video title is required"),
  classVideoURL: z.string().min(1, "Video URL is required"),
  classVideoLength: z.string().min(1, "Video length is required"),
  disableVideo: z.boolean(),
});

export const createCourseSchema = z.object({
  title: z.string().min(1, "Course Title is required"),
  description: z.string().min(1, "Course Description is required"),
  price: z.number().min(0, "Course Price must be 0 or greater"),
  duration_months: z.number().min(1, "Course Duration must be 1 or greater"),
  status: z.enum(["draft", "pending review", "published"]),
  difficulty_level: z.enum(["beginner", "intermediate", "advance"]),
  delivery_method: z.string().min(1, "Course Delivery Method is required"),
  course_type: z.enum(["free", "paid"]),
  thumbnail: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 1024 * 1024 * 5,
      "File size must be less than 5MB"
    ),
});