import { z } from "zod";

export const createClassSchema = z.object({
  academicSessionId: z.string(),

  name: z.string().min(1),

  classCode: z.string().min(1),

  capacity: z.number().optional(),

  shift: z.enum([
    "Morning",
    "Day",
    "Evening",
  ]).optional(),

  version: z.enum([
    "Bangla",
    "English",
    "Madrasa",
  ]).optional(),

  group: z.enum([
    "None",
    "Science",
    "Commerce",
    "Arts",
  ]).optional(),
});