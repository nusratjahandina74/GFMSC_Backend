import express from "express";
import { getStudentMigrationLogs } from "../controllers/migrationController.js";

const router = express.Router();

router.get("/student/:studentId", getStudentMigrationLogs);

export default router;