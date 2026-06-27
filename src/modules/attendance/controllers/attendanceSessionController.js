import {
  createAttendanceSessionService,
  deleteAttendanceSessionService,
  getAttendanceSessionByIdService,
  getAttendanceSessionsService,
  updateAttendanceSessionService,
} from "../services/attendanceSessionService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  attendanceSessionCreateSchema,
  attendanceSessionQuerySchema,
  attendanceSessionUpdateSchema,
} from "../validations/attendanceSessionValidation.js";

export const createAttendanceSessionController =
  asyncHandler(async (req, res) => {
    const payload =
      attendanceSessionCreateSchema.parse(
        req.body
      );

    const data =
      await createAttendanceSessionService(
        payload,
        req.schoolId,
        req.user._id
      );

    return res.status(201).json({
      success: true,
      message:
        "Attendance session created successfully.",
      data,
    });
  });

export const getAttendanceSessionsController =
  asyncHandler(async (req, res) => {
    const query =
      attendanceSessionQuerySchema.parse(
        req.query
      );

    const result =
      await getAttendanceSessionsService(
        query,
        req.schoolId
      );

    return res.status(200).json({
      success: true,
      message:
        "Attendance sessions fetched successfully.",
      ...result,
    });
  });

export const getAttendanceSessionByIdController =
  asyncHandler(async (req, res) => {
    const data =
      await getAttendanceSessionByIdService(
        req.params.id,
        req.schoolId
      );

    return res.status(200).json({
      success: true,
      message:
        "Attendance session fetched successfully.",
      data,
    });
  });

export const updateAttendanceSessionController =
  asyncHandler(async (req, res) => {
    const payload =
      attendanceSessionUpdateSchema.parse(
        req.body
      );

    const data =
      await updateAttendanceSessionService(
        req.params.id,
        payload,
        req.schoolId,
        req.user._id
      );

    return res.status(200).json({
      success: true,
      message:
        "Attendance session updated successfully.",
      data,
    });
  });

export const deleteAttendanceSessionController =
  asyncHandler(async (req, res) => {
    const data =
      await deleteAttendanceSessionService(
        req.params.id,
        req.schoolId,
        req.user._id
      );

    return res.status(200).json({
      success: true,
      message:
        "Attendance session deleted successfully.",
      data,
    });
  });
