import { z } from "zod";

// CREATE
export const createStudentSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name is required"),

  rollNumber: z
    .string()
    .min(1, "Roll number is required"),

  className: z
    .string()
    .min(1, "Class is required"),
});

// UPDATE
export const updateStudentSchema = z.object({
  fullName: z.string().optional(),

  rollNumber: z.string().optional(),

  className: z.string().optional(),
});