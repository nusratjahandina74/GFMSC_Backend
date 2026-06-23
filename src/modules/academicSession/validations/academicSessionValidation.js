import { z } from "zod";

export const createAcademicSessionSchema =
  z.object({
    sessionName:
      z.string().min(3),

    startDate: z.string(),

    endDate: z.string(),
  });