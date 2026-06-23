import { z } from "zod";

export const archiveStudentSchema = z.object({
    studentId: z.string(),
});