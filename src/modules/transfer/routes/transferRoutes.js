import express from "express";

import { transferStudent } from "../controllers/transferController.js";

import  authMiddleware from "../../../middleware/authMiddleware.js";
import { roleMiddleware } from "../../../middleware/roleMiddleware.js";
import { tenantMiddleware } from "../../../middleware/tenantMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(
    "SuperAdmin",
    "SchoolAdmin"
  ),
  tenantMiddleware,
  transferStudent
);

export default router;