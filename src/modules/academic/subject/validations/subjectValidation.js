import { z } from "zod";

export const createSubjectSchema = z.object({
  body: z.object({
    classId: z.string({
      required_error: "Class ID is required",
    }),

    subjectName: z.string().min(2),

    subjectCode: z.string().min(2),

    subjectType: z.enum([
      "Mandatory",
      "Optional",
    ]),

    fullMarks: z.number().optional(),

    passMarks: z.number().optional(),
  }),
});