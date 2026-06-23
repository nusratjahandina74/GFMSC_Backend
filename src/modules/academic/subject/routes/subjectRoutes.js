import express from "express";

import  authMiddleware  from "../../../../middleware/authMiddleware.js";

import { roleMiddleware } from "../../../../middleware/roleMiddleware.js";

import { tenantMiddleware } from "../../../../middleware/tenantMiddleware.js";

import validate from "../../../../middleware/validateMiddleware.js";

import { createSubjectSchema } from "../validations/subjectValidation.js";

import { createSubject } from "../controllers/subjectController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("SchoolAdmin"),
  tenantMiddleware,
  validate(createSubjectSchema),
  createSubject
);

export default router;