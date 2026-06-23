import express from "express";

import {bulkPromoteStudents, promoteStudent,} from "../controllers/promotionController.js";

import authMiddleware from "../../../middleware/authMiddleware.js";

import { roleMiddleware } from "../../../middleware/roleMiddleware.js";

import { tenantMiddleware } from "../../../middleware/tenantMiddleware.js";

const router = express.Router();

router.post(
  "/bulk-promote",

  authMiddleware,

  roleMiddleware(
    "SchoolAdmin"
  ),

  tenantMiddleware,

  bulkPromoteStudents
);

export default router;