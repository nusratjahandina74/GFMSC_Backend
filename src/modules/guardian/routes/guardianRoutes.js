import express from "express";

import { createGuardian } from "../controllers/guardianController.js";

import  authMiddleware from "../../../middleware/authMiddleware.js";

import { roleMiddleware } from "../../../middleware/roleMiddleware.js";

import { tenantMiddleware } from "../../../middleware/tenantMiddleware.js";

import { parentLogin } from "../controllers/parentAuthController.js";

import { getMyChildren } from "../controllers/parentPortalController.js";
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(
    "SchoolAdmin",
    "Teacher"
  ),
  tenantMiddleware,
  createGuardian
);
router.post(
  "/parent-login",
  parentLogin
);

router.get(
  "/my-children",
  authMiddleware,
  roleMiddleware("Parent"),
  tenantMiddleware,
  getMyChildren
);

export default router;