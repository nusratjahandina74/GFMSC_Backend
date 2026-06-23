import { z } from "zod";

export const dashboardQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});