import { z } from "zod";

// Create Phase Schema
export const createPhaseSchema = z.object({
  courseTitle: z.string().min(1, "Course title is required"),
  phaseName: z.string().min(1, "Phase name is required"),
  phaseTitle: z.string().min(1, "Phase title is required"),
  phaseUrl: z.string().min(1, "Phase URL is required"),
  description: z.string().min(1, "Description is required"),
  phaseIcon: z.any().optional(),
});

export const createWeekSchema = z.object({
  courseTitle: z.string().min(6, "Course title is required"),
  phaseName: z.string().min(6, "Phase name is required"),
  weekName: z.string().min(6, "Week name is required"),
  weekTitle: z.string().min(6, "Week title is required"),
  groupSession: z.string().min(6, "Group session is required"),
  liveSession: z.string().min(6, "Live session is required"),
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
