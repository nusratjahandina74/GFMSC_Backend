import { z } from "zod";

export const createGuardianSchema =
  z.object({
    fullName: z.string().min(3),

    phone: z.string().min(11),

    password: z.string().min(6),

    email: z
      .string()
      .email()
      .optional(),

    occupation:
      z.string().optional(),

    relation: z.enum([
      "Father",
      "Mother",
      "Guardian",
    ]),

    address:
      z.string().optional(),

    studentId: z.string(),
  });