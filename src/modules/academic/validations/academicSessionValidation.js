import { z } from "zod";

export const createAcademicSessionSchema = z.object({
  name: z.string().min(2),

  startDate: z.string(),

  endDate: z.string(),
});