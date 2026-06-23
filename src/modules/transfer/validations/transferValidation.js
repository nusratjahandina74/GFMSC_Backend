import { z } from "zod";

export const transferStudentSchema =
  z.object({
    studentId: z.string(),

    newClassId: z.string(),

    newSectionId: z.string(),

    reason:
      z.string().optional(),
  });