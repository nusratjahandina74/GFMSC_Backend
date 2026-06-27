import mongoose from "mongoose";

import AttendanceSession from "../models/AttendanceSession.js";

import {
    ATTENDANCE_STATUS,
} from "../constants/attendanceConstants.js";

import * as attendanceRepository
    from "../repositories/attendanceRepository.js";

import {
    normalizeAttendanceDate,
    buildAttendanceFilter,
    buildPagination
} from "../helpers/attendanceHelper.js";

import AuditLog
    from "../../audit/models/AuditLog.js";
const validateAttendanceSession = async (attendanceSessionId,schoolId,session = null) => {
    const attendanceSession = await AttendanceSession.findOne({
    _id:attendanceSessionId,
    schoolId,
}).session(session);
    if (!attendanceSession) {
        throw new Error(
            "Attendance session not found."
        );
    }
    if (attendanceSession.status !== "Open") {
        throw new Error(
            "Attendance session is closed."
        );
    }
    return attendanceSession;
};
const createAuditLog = async ({
    schoolId,
    userId,
    attendanceId,
    action,
    newData,
    oldData = null,
    session = null,
}) => {
    await AuditLog.create(
        [
            {
                schoolId,
                userId,
                module: "Attendance",
                action,
                entityId: attendanceId,
                oldData,
                newData,
            },
        ],
        {
            session,
        }
    );
};
export const markAttendance = async (attendanceData,userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        attendanceData.attendanceDate =
            normalizeAttendanceDate(
                attendanceData.attendanceDate
            );
        await validateAttendanceSession(
            attendanceData.attendanceSessionId,
            attendanceData.schoolId,
            session
        );
        const duplicate = await attendanceRepository.findDuplicateAttendance(
            {
                schoolId:
                attendanceData.schoolId,
                studentId:
                attendanceData.studentId,
                attendanceDate:
                attendanceData.attendanceDate,
            },
                session
            );
            await session.endSession();
        if (duplicate) {
            throw new Error(
                "Attendance already marked."
            );
        }
        const attendance = await attendanceRepository.create(
                {
                    ...attendanceData,
                    markedBy: userId,
                    status:
                    attendanceData.status ??
                    ATTENDANCE_STATUS.PRESENT,
                },
                session
            );
        await createAuditLog({
            schoolId: attendance.schoolId,
            userId,
            attendanceId: attendance._id,
            action: "ATTENDANCE_MARKED",
            newData: attendance,
            session,
        });
        await session.commitTransaction();
        return {
            success: true,
            message:
                "Attendance marked successfully.",
            data: attendance,
        };
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }

};
export const bulkMarkAttendance = async (attendanceList,userId) => {
    const session =await mongoose.startSession();
    session.startTransaction();
    try {
        const payload = [];
        for (const item of attendanceList) {
            item.attendanceDate = normalizeAttendanceDate(
                item.attendanceDate
            );
            await validateAttendanceSession(
                item.attendanceSessionId,
                item.schoolId,
                session
            );
            const duplicate = await attendanceRepository.findDuplicateAttendance(
                {
                    schoolId: item.schoolId,
                    studentId: item.studentId,
                    attendanceDate: item.attendanceDate,
                },
                session
                );
            if (duplicate) {
                continue;
            }
            payload.push({...item,markedBy: userId, status:
                item.status ??
                ATTENDANCE_STATUS.PRESENT,
            });
        }
        if (!payload.length) {
            throw new Error(
            "All attendance records already exist."
            );
        }
        const attendances = await attendanceRepository.bulkCreateAttendance(
            payload,
            {
                session,
            }
        );
        await createAuditLog({schoolId:
            payload[0].schoolId,
            userId,
            attendanceId: null,
            action:
                "BULK_ATTENDANCE_MARKED",
            newData: {
                total:
                    attendances.length,
            },
            session,
        });
        await session.commitTransaction();
        return {
            success: true,
            message:
                "Bulk attendance completed.",
            total:
                attendances.length,
            data:
                attendances,
        };
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        await session.endSession();
    }
};
export const getAttendance = async (query) => {
    const filter =
        buildAttendanceFilter(query);
    const {page,limit,} = buildPagination(query);
    const [records,total,] = await Promise.all([
        attendanceRepository.findAttendances(filter,
            {
                page,
                limit,
            }
        ),
        attendanceRepository.countAttendances(
            filter
        ),
    ]);
    return {
        success: true,
        message:
            "Attendance fetched successfully.",
        data:
            records,
        pagination: {
            page,
            limit,
            total,
            totalPages:
                Math.ceil(
                    total / limit
                ),
            hasNext:
                page * limit < total,
            hasPrevious:
                page > 1,
        },
    };
};
export const getAttendanceById = async (id) => {
    const attendance = await attendanceRepository.findAttendanceById(id);
    if (!attendance) {
        throw new Error(
            "Attendance not found."
        );
    }
    return {
        success: true,
        message:
            "Attendance fetched successfully.",
        data: attendance,
    };
};
export const updateAttendance = async (attendanceId,payload,userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const attendance = await attendanceRepository.findAttendance(
            {
                _id: attendanceId,
                isDeleted: false,
            }
        );
        if (!attendance) {
            throw new Error(
                "Attendance not found."
            );
        }
        if (attendance.isLocked) {
            throw new Error(
                "Attendance is locked."
            );
        }
        const oldData = attendance.toObject();
        if (payload.attendanceDate) {
            payload.attendanceDate =
                normalizeAttendanceDate(
                    payload.attendanceDate
                );
        }
        const updatedAttendance = await attendanceRepository.updateAttendance(
            {
                _id: attendanceId,
            },
                payload,
            {
                session,
            }
            );
        await createAuditLog({
            schoolId: attendance.schoolId,
            userId,
            attendanceId: attendance._id,
            action: "ATTENDANCE_UPDATED",
            oldData,
            newData: updatedAttendance,
            session,
        });
        await session.commitTransaction();
        return {
            success: true,
            message:
                "Attendance updated successfully.",
            data: updatedAttendance,
        };
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        await session.endSession();
    }
};
export const deleteAttendance = async (attendanceId,userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
       const attendance = await attendanceRepository.findAttendance(
            {
                _id: attendanceId,
                isDeleted: false,
            }
            );
        if (!attendance) {
            throw new Error(
                "Attendance not found."
            );
        }
        if (attendance.isLocked) {
            throw new Error(
                "Attendance is locked."
            );
        }
        await attendanceRepository.softDeleteAttendance(
            {
                _id: attendanceId,
            },
            userId,
            {
                session,
            }
        );
        await createAuditLog({
            schoolId: attendance.schoolId,
            userId,
            attendanceId: attendance._id,
            action: "ATTENDANCE_DELETED",
            oldData: attendance,
            newData: null,
            session,
        });
        await session.commitTransaction();
        return {
            success: true,
            message:
                "Attendance deleted successfully.",
        };
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {await session.endSession();}
};