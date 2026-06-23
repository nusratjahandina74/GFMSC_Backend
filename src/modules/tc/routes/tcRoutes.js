import express from "express";

import {
  generateTC,
  verifyTC,
} from "../controllers/tcController.js";

import authMiddleware from "../../../middleware/authMiddleware.js";

import {
  roleMiddleware,
} from "../../../middleware/roleMiddleware.js";

import {
  tenantMiddleware,
} from "../../../middleware/tenantMiddleware.js";

const router =
  express.Router();

router.post(
  "/generate",
  authMiddleware,
  roleMiddleware(
    "SuperAdmin",
    "SchoolAdmin"
  ),
  tenantMiddleware,
  generateTC
);
router.get(
  "/verify/:token", verifyTC);

export default router;