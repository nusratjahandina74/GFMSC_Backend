import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";



import studentRoutes from "./modules/student/routes/studentRoutes.js";
import guardianRoutes from "./modules/guardian/routes/guardianRoutes.js";
import classRoutes from "./modules/academic/class/routes/classRoutes.js";
import subjectRoutes from "./modules/academic/subject/routes/subjectRoutes.js";
import sectionRoutes from "./modules/academic/section/routes/sectionRoutes.js";
import teacherAssignmentRoutes from "./modules/academic/teacherAssignment/routes/teacherAssignmentRoutes.js";
import academicSessionRoutes from "./modules/academicSession/routes/academicSessionRoutes.js";
import studentAcademicHistoryRoutes from "./modules/studentAcademicHistory/routes/studentAcademicHistoryRoutes.js";
import promotionRoutes from "./modules/promotion/routes/promotionRoutes.js";
import transferRoutes from "./modules/transfer/routes/transferRoutes.js";
import tcRoutes from "./modules/tc/routes/tcRoutes.js";
import auditRoutes from "./modules/audit/routes/auditRoutes.js";
import migrationRoutes from "./modules/migration/routes/migrationRoutes.js";
import alumniRoutes from "./modules/alumni/routes/alumniRoutes.js";
import migrationLogRoutes from "./modules/migrationLogs/routes/migrationLogRoutes.js";
import dashboardRoutes from "./modules/dashboard/routes/dashboardRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import attendanceRoutes from "./modules/attendance/routes/attendanceRoutes.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/guardians", guardianRoutes);
app.use("/api/v1", classRoutes);
app.use("/api/v1/classes", classRoutes);
app.use("/api/v1/subjects", subjectRoutes);

app.use("/api/v1/sections", sectionRoutes);

app.use(
  "/api/v1/teacher-assignments",
  teacherAssignmentRoutes
);
app.use(
  "/api/v1/academic-sessions",
  academicSessionRoutes
);
app.use(
  "/api/v1/student-academic-history",
  studentAcademicHistoryRoutes
);
app.use("/api/v1/promotions", promotionRoutes);
app.use("/api/v1/transfers", transferRoutes);
app.use("/api/v1/tc", tcRoutes);
app.use("/api/v1/audit", auditRoutes);
app.use("/api/v1/migration-logs", migrationRoutes);
app.use("/api/v1/alumni", alumniRoutes);
app.use("/api/v1/migration-logs", migrationLogRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/attendance", attendanceRoutes);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorMiddleware);

export default app;
