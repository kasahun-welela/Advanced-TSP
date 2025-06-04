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