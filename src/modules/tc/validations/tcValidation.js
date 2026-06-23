import { z } from "zod";

export const generateTCSchema =
  z.object({
    studentId: z.string(),

    reason: z.string(),

    remarks:
      z.string().optional(),
  });