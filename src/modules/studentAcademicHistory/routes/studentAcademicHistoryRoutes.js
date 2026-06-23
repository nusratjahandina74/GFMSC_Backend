import express from "express";

import authMiddleware from "../../../middleware/authMiddleware.js";

import { roleMiddleware } from "../../../middleware/roleMiddleware.js";

import { tenantMiddleware } from "../../../middleware/tenantMiddleware.js";

import {
  createAcademicHistory,
} from "../controllers/studentAcademicHistoryController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(
    "SchoolAdmin",
    "Teacher"
  ),
  tenantMiddleware,
  createAcademicHistory
);

export default router;