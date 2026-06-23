import express from "express";

import {
  createAcademicSession,
} from "../controllers/academicSessionController.js";

import  authMiddleware  from "../../../middleware/authMiddleware.js";

import { roleMiddleware } from "../../../middleware/roleMiddleware.js";

import { tenantMiddleware } from "../../../middleware/tenantMiddleware.js";

const router = express.Router();

router.post(
  "/",

  authMiddleware,

  roleMiddleware(
    "SchoolAdmin"
  ),

  tenantMiddleware,

  createAcademicSession
);

export default router;