import express from "express";

import {
  archiveStudent,
} from "../controllers/alumniController.js";

import authMiddleware from "../../../middleware/authMiddleware.js";

import {
  roleMiddleware,
} from "../../../middleware/roleMiddleware.js";

import {
  tenantMiddleware,
} from "../../../middleware/tenantMiddleware.js";

const router = express.Router();

router.post(
  "/archive",
  authMiddleware,
  roleMiddleware(
    "SchoolAdmin",
    "SuperAdmin"
  ),
  tenantMiddleware,
  archiveStudent
);

export default router;