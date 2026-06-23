import { z } from "zod";

export const createSectionSchema = z.object({
  academicSessionId: z.string(),

  classId: z.string(),

  name: z.string().min(1),

  capacity: z.number().optional(),
});