import { z } from "zod";

export const createAcademicHistorySchema =
  z.object({
    studentId: z.string(),

    academicSessionId:
      z.string(),

    classId: z.string(),

    sectionId:
      z.string().optional(),

    rollNumber: z.number(),

    remarks:
      z.string().optional(),
  });