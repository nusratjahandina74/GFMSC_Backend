import { z } from "zod";

export const promoteStudentSchema =
  z.object({
    studentId: z.string(),

    newAcademicSessionId:
      z.string(),

    newClassId: z.string(),

    newSectionId:
      z.string().optional(),
  });


export const bulkPromotionSchema =
  z.object({
    fromClassId: z.string(),

    fromSectionId: z.string(),

    toClassId: z.string(),

    toSectionId: z.string(),

    fromAcademicSessionId:
      z.string(),

    toAcademicSessionId:
      z.string(),
  });