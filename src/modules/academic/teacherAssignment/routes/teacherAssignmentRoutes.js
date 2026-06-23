import express from "express";

import authMiddleware from "../../../../middleware/authMiddleware.js";

import { roleMiddleware } from "../../../../middleware/roleMiddleware.js";

import { tenantMiddleware } from "../../../../middleware/tenantMiddleware.js";

import validate from "../../../../middleware/validateMiddleware.js";

import { createTeacherAssignmentSchema } from "../validations/teacherAssignmentValidation.js";

import { createTeacherAssignment } from "../controllers/teacherAssignmentController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("SchoolAdmin"),
  tenantMiddleware,
  validate(createTeacherAssignmentSchema),
  createTeacherAssignment
);

export default router;