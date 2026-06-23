

// export default router;
import express from "express";

import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  restoreStudent,
} from "../controllers/student/studentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import { roleMiddleware } from "../middleware/roleMiddleware.js";

import { tenantMiddleware } from "../middleware/tenantMiddleware.js";

const router = express.Router();

// ===================================
// CREATE STUDENT
// ===================================
router.post(
  "/students",
  authMiddleware,
  roleMiddleware("SchoolAdmin"),
  tenantMiddleware,
  createStudent
);

// ===================================
// GET STUDENTS
// ===================================
router.get(
  "/students",
  authMiddleware,
  roleMiddleware(
    "SchoolAdmin",
    "Teacher"
  ),
  tenantMiddleware,
  getStudents
);
// UPDATE
router.put(
  "/students/:id",
  authMiddleware,
  roleMiddleware("SchoolAdmin"),
  tenantMiddleware,
  updateStudent
);

// DELETE
router.delete(
  "/students/:id",
  authMiddleware,
  roleMiddleware("SchoolAdmin"),
  tenantMiddleware,
  deleteStudent
);

// RESTORE
router.patch(
  "/students/restore/:id",
  authMiddleware,
  roleMiddleware("SchoolAdmin"),
  tenantMiddleware,
  restoreStudent
);

export default router;