import express from "express";

import {
    getStudentMigrationLog,
} from "../controllers/migrationLogController.js";

import authMiddleware from "../../../middleware/authMiddleware.js";
import { roleMiddleware } from "../../../middleware/roleMiddleware.js";
import { tenantMiddleware } from "../../../middleware/tenantMiddleware.js";

const router = express.Router();

router.get(
    "/student/:studentId",

    authMiddleware,

    roleMiddleware(
        "SchoolAdmin",
        "Teacher"
    ),

    tenantMiddleware,

    getStudentMigrationLog
);

export default router;