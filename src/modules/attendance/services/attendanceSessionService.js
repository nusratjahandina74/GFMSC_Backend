import {
  attendanceExists,
} from "../repositories/attendanceRepository.js";
import {
  countAttendanceSessions,
  createAttendanceSession,
  findAttendanceSession,
  findAttendanceSessionById,
  findAttendanceSessions,
  softDeleteAttendanceSession,
  updateAttendanceSession,
} from "../repositories/attendanceSessionRepository.js";
import { normalizeAttendanceDate } from "../helpers/attendanceHelper.js";
import { createAuditLog } from "../../audit/services/auditService.js";

const buildDuplicateFilter = (
  payload,
  schoolId
) => ({
  schoolId,
  academicSessionId: payload.academicSessionId,
  classId: payload.classId,
  sectionId: payload.sectionId,
  teacherId: payload.teacherId,
  attendanceDate: normalizeAttendanceDate(
    payload.attendanceDate
  ),
  subjectId: payload.subjectId ?? null,
});

const buildQueryFilter = (
  query,
  schoolId
) => {
  const filter = {
    schoolId,
  };

  if (query.status) {
    filter.status = query.status;
  }

  if (query.classId) {
    filter.classId = query.classId;
  }

  if (query.sectionId) {
    filter.sectionId = query.sectionId;
  }

  if (query.teacherId) {
    filter.teacherId = query.teacherId;
  }

  if (query.academicSessionId) {
    filter.academicSessionId =
      query.academicSessionId;
  }

  if (query.attendanceDate) {
    filter.attendanceDate =
      normalizeAttendanceDate(
        query.attendanceDate
      );
  }

  return filter;
};

export const createAttendanceSessionService =
  async (payload, schoolId, userId) => {
    const normalizedPayload = {
      ...payload,
      attendanceDate:
        normalizeAttendanceDate(
          payload.attendanceDate
        ),
      subjectId: payload.subjectId ?? null,
      schoolId,
      createdBy: userId,
    };

    const existing =
      await findAttendanceSession(
        buildDuplicateFilter(
          normalizedPayload,
          schoolId
        )
      );

    if (existing) {
      const error = new Error(
        "Attendance session already exists for this class, section, teacher, and date."
      );
      error.statusCode = 409;
      throw error;
    }

    const session =
      await createAttendanceSession(
        normalizedPayload
      );

    await createAuditLog({
      schoolId,
      userId,
      action: "CREATE_ATTENDANCE_SESSION",
      module: "AttendanceSession",
      entityId: session._id,
      newData: session,
    });

    return session;
  };

export const getAttendanceSessionsService =
  async (query, schoolId) => {
    const filter = buildQueryFilter(
      query,
      schoolId
    );
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    const [data, total] = await Promise.all([
      findAttendanceSessions(filter, {
        page,
        limit,
      }),
      countAttendanceSessions(filter),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  };

export const getAttendanceSessionByIdService =
  async (id, schoolId) => {
    const session =
      await findAttendanceSessionById(
        id,
        schoolId
      );

    if (!session) {
      const error = new Error(
        "Attendance session not found."
      );
      error.statusCode = 404;
      throw error;
    }

    return session;
  };

export const updateAttendanceSessionService =
  async (
    id,
    payload,
    schoolId,
    userId
  ) => {
    const existing =
      await findAttendanceSession({
        _id: id,
        schoolId,
      });

    if (!existing) {
      const error = new Error(
        "Attendance session not found."
      );
      error.statusCode = 404;
      throw error;
    }

    const nextPayload = {
      ...payload,
    };

    if (payload.attendanceDate) {
      nextPayload.attendanceDate =
        normalizeAttendanceDate(
          payload.attendanceDate
        );
    }

    if ("subjectId" in payload) {
      nextPayload.subjectId =
        payload.subjectId ?? null;
    }

    const duplicateCheckPayload = {
      academicSessionId:
        nextPayload.academicSessionId ??
        existing.academicSessionId,
      classId:
        nextPayload.classId ?? existing.classId,
      sectionId:
        nextPayload.sectionId ??
        existing.sectionId,
      teacherId:
        nextPayload.teacherId ??
        existing.teacherId,
      attendanceDate:
        nextPayload.attendanceDate ??
        existing.attendanceDate,
      subjectId:
        nextPayload.subjectId ??
        existing.subjectId,
    };

    const duplicate =
      await findAttendanceSession({
        ...buildDuplicateFilter(
          duplicateCheckPayload,
          schoolId
        ),
        _id: {
          $ne: id,
        },
      });

    if (duplicate) {
      const error = new Error(
        "Another attendance session already exists with the same schedule."
      );
      error.statusCode = 409;
      throw error;
    }

    const updated =
      await updateAttendanceSession(
        {
          _id: id,
          schoolId,
        },
        nextPayload
      );

    await createAuditLog({
      schoolId,
      userId,
      action: "UPDATE_ATTENDANCE_SESSION",
      module: "AttendanceSession",
      entityId: updated._id,
      oldData: existing,
      newData: updated,
    });

    return updated;
  };

export const deleteAttendanceSessionService =
  async (
    id,
    schoolId,
    userId
  ) => {
    const existing =
      await findAttendanceSession({
        _id: id,
        schoolId,
      });

    if (!existing) {
      const error = new Error(
        "Attendance session not found."
      );
      error.statusCode = 404;
      throw error;
    }

    const hasAttendance =
      await attendanceExists({
        schoolId,
        attendanceSessionId: id,
      });

    if (hasAttendance) {
      const error = new Error(
        "Attendance session cannot be deleted after attendance has been marked."
      );
      error.statusCode = 409;
      throw error;
    }

    const deleted =
      await softDeleteAttendanceSession(
        {
          _id: id,
          schoolId,
        },
        userId
      );

    await createAuditLog({
      schoolId,
      userId,
      action: "DELETE_ATTENDANCE_SESSION",
      module: "AttendanceSession",
      entityId: id,
      oldData: existing,
      newData: deleted,
    });

    return deleted;
  };
