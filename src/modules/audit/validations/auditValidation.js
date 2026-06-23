import { z } from "zod";

export const auditQuerySchema = z.object({

    page: z.string().optional(),

    limit: z.string().optional(),

    action: z.string().optional(),

    module: z.string().optional(),

    userId: z.string().optional(),

    startDate: z.string().optional(),

    endDate: z.string().optional(),

});