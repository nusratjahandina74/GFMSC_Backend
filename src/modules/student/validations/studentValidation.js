import { z } from "zod";

export const createStudentSchema =
  z.object({
    fullName: z.string().min(2),

    birthCertificateNo: z
      .string()
      .min(5),

    phone: z.string().min(11),

    gender: z.enum([
      "Male",
      "Female",
    ]),

    dateOfBirth: z.string(),

    address: z.string(),

    classId: z.string(),

    sectionId: z.string(),
  });
export const reactivateStudentSchema=
z.object({

studentId:
z.string(),

classId:
z.string(),

sectionId:
z.string(),

sessionId:
z.string(),

});