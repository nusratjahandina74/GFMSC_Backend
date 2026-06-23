import { z } from "zod";

export const recoverStudentSchema =
    z.object({
        studentId: z.string(),
    });