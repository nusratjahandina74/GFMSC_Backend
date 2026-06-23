import express from "express";

import {
  createStudent,
  reactivateStudent,
  deleteStudent
} from "../controllers/studentController.js";

import authMiddleware from "../../../middleware/authMiddleware.js";

import { roleMiddleware } from "../../../middleware/roleMiddleware.js";

import { tenantMiddleware } from "../../../middleware/tenantMiddleware.js";
import {recoverStudent,} from "../controllers/studentRecoveryController.js";
import {searchStudents} from "../controllers/studentSearchController.js";
const router = express.Router();

router.post(
  "/admission",
  authMiddleware,
  roleMiddleware(
    "SchoolAdmin",
    "Teacher"
  ),
  tenantMiddleware,
  createStudent
);

router.post(
  "/reactivate",
  authMiddleware,
  roleMiddleware(
    "SchoolAdmin"
  ),
  tenantMiddleware,
  reactivateStudent
);
router.post(

"/recover",

authMiddleware,

roleMiddleware(

"SchoolAdmin"

),

tenantMiddleware,

recoverStudent

);
router.post(
  "/delete",
  authMiddleware,
  roleMiddleware("SchoolAdmin"),
  tenantMiddleware,
  deleteStudent
);
router.get(

"/search",

authMiddleware,

roleMiddleware(

"SchoolAdmin",

"Teacher"

),

tenantMiddleware,

searchStudents

);
export default router;