import express from "express";
import {
    markAttendanceController,
    bulkMarkAttendanceController,
    getAttendanceController,
    getAttendanceByIdController,
    updateAttendanceController,
    deleteAttendanceController,
} from "../controllers/attendanceController.js";
import {
    createAttendanceSessionController,
    deleteAttendanceSessionController,
    getAttendanceSessionByIdController,
    getAttendanceSessionsController,
    updateAttendanceSessionController,
} from "../controllers/attendanceSessionController.js";
import authMiddleware from "../../../middleware/authMiddleware.js";
import tenantMiddleware from "../../../middleware/tenantMiddleware.js";
import roleMiddleware from "../../../middleware/roleMiddleware.js";

const router = express.Router();
/*
|--------------------------------------------------------------------------
| Attendance Routes
|--------------------------------------------------------------------------
*/
/*
|--------------------------------------------------------------------------
| POST /api/v1/attendance
|--------------------------------------------------------------------------
*/
router.post("/",authMiddleware,tenantMiddleware,
    roleMiddleware(
        "SuperAdmin",
        "SchoolAdmin",
        "Teacher"
    ),
    markAttendanceController
);
/*
|--------------------------------------------------------------------------
| POST /api/v1/attendance/bulk
|--------------------------------------------------------------------------
*/
router.post("/bulk",authMiddleware,tenantMiddleware,roleMiddleware(
        "SuperAdmin",
        "SchoolAdmin",
        "Teacher"
    ),
    bulkMarkAttendanceController
);

router.post(
    "/sessions",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware(
        "SuperAdmin",
        "SchoolAdmin",
        "Teacher"
    ),
    createAttendanceSessionController
);

router.get(
    "/sessions",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware(
        "SuperAdmin",
        "SchoolAdmin",
        "Teacher"
    ),
    getAttendanceSessionsController
);

router.get(
    "/sessions/:id",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware(
        "SuperAdmin",
        "SchoolAdmin",
        "Teacher"
    ),
    getAttendanceSessionByIdController
);

router.patch(
    "/sessions/:id",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware(
        "SuperAdmin",
        "SchoolAdmin",
        "Teacher"
    ),
    updateAttendanceSessionController
);

router.delete(
    "/sessions/:id",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware(
        "SuperAdmin",
        "SchoolAdmin"
    ),
    deleteAttendanceSessionController
);
/*
|--------------------------------------------------------------------------
| GET /api/v1/attendance
|--------------------------------------------------------------------------
*/
router.get("/",authMiddleware,tenantMiddleware,
    roleMiddleware(
        "SuperAdmin",
        "SchoolAdmin",
        "Teacher"
    ),
  getAttendanceController
);
/*
|--------------------------------------------------------------------------
| GET /api/v1/attendance/:id
|--------------------------------------------------------------------------
*/
router.get("/:id",authMiddleware,tenantMiddleware,
    roleMiddleware(
        "SuperAdmin",
        "SchoolAdmin",
        "Teacher"
    ),
    getAttendanceByIdController
);
/*
|--------------------------------------------------------------------------
| PATCH /api/v1/attendance/:id
|--------------------------------------------------------------------------
*/
router.patch("/:id",authMiddleware,tenantMiddleware,
    roleMiddleware(
        "SuperAdmin",
        "SchoolAdmin",
        "Teacher"
    ),
    updateAttendanceController
);
/*
|--------------------------------------------------------------------------
| DELETE /api/v1/attendance/:id
|--------------------------------------------------------------------------
*/
router.delete("/:id",authMiddleware,tenantMiddleware,
    roleMiddleware(
        "SuperAdmin",
        "SchoolAdmin"
    ),
    deleteAttendanceController
);
export default router;
