import { z } from "zod";
export const attendanceCreateSchema = z.object({
    studentId: z.string(),
    attendanceSessionId: z.string(),
    attendanceDate: z.string(),
    status: z.enum([
        "Present",
        "Absent",
        "Late",
        "Leave",
    ]),
    remarks: z.string().optional(),
});
export const attendanceSchema = z.object({

    studentId: z.string().min(1),

    attendanceSessionId: z.string().min(1),

    attendanceDate: z.coerce.date(),

    status: z.enum([
        "Present",
        "Absent",
        "Late",
        "Leave",
    ]),

    remarks: z.string().optional(),

});

export const bulkAttendanceSchema =
z.object({

    attendances: z.array(
        attendanceSchema
    ).min(1),

});

export const attendanceQuerySchema =
z.object({

    page: z.coerce.number()
        .optional()
        .default(1),

    limit: z.coerce.number()
        .optional()
        .default(20),

    classId: z.string().optional(),

    sectionId: z.string().optional(),

    attendanceDate:
        z.string().optional(),

    studentId:
        z.string().optional(),

});

export const attendanceUpdateSchema =
attendanceSchema.partial();