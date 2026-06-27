import { z } from "zod";

const optionalDate = z
  .union([z.coerce.date(), z.null()])
  .optional();

export const attendanceSessionCreateSchema =
  z.object({
    academicSessionId: z.string().min(1),
    classId: z.string().min(1),
    sectionId: z.string().min(1),
    subjectId: z.string().optional().nullable(),
    teacherId: z.string().min(1),
    attendanceDate: z.coerce.date(),
    startTime: optionalDate,
    endTime: optionalDate,
    remarks: z.string().trim().optional(),
  });

export const attendanceSessionUpdateSchema =
  attendanceSessionCreateSchema
    .partial()
    .extend({
      status: z
        .enum(["Open", "Closed"])
        .optional(),
    });

export const attendanceSessionQuerySchema =
  z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    status: z
      .enum(["Open", "Closed"])
      .optional(),
    classId: z.string().optional(),
    sectionId: z.string().optional(),
    teacherId: z.string().optional(),
    academicSessionId: z.string().optional(),
    attendanceDate: z.string().optional(),
  });
