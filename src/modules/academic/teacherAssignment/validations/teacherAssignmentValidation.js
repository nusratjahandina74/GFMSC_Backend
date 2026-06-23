import { z } from "zod";

export const createTeacherAssignmentSchema =
  z.object({
    body: z.object({
      teacherId: z.string(),

      classId: z.string(),

      sectionId: z.string(),

      subjectId: z.string(),

      isClassTeacher: z
        .boolean()
        .optional(),
    }),
  });
  export default createTeacherAssignmentSchema;