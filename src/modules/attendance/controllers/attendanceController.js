import {
    markAttendance,
    bulkMarkAttendance,
    getAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
} from "../services/attendanceService.js";
import {
    attendanceCreateSchema,
    attendanceSchema,
    bulkAttendanceSchema,
    attendanceQuerySchema,
    attendanceUpdateSchema
} from "../validations/attendanceValidation.js";
import {asyncHandler} from "../utils/asyncHandler.js";
export const markAttendanceController = asyncHandler(async (req, res) => {
    const payload = attendanceCreateSchema.parse(req.body);
    const result = await markAttendance(
        {
            ...payload,
            schoolId: req.schoolId,
        },
        req.user._id
        );
        return res.status(201).json(result);
});
export const bulkMarkAttendanceController = asyncHandler(async (req, res) => {
    const payload = attendanceBulkCreateSchema.parse(req.body);
    const attendanceList = payload.map((item) => ({
        ...item,
        schoolId: req.schoolId,
    }));
    const result = await bulkMarkAttendance(
        attendanceList,
        req.user._id
    );
        return res.status(201).json(result);
});
export const getAttendanceController = asyncHandler(async (req, res) => {
    const query = attendanceQuerySchema.parse({
        ...req.query,
        schoolId: req.schoolId,
    });
    const result = await getAttendance(query);
    return res.status(200).json(result);
});
export const getAttendanceByIdController = asyncHandler(async (req, res) => {
    const result = await getAttendanceById(
        req.params.id
    );
    return res.status(200).json(result);
});
export const updateAttendanceController = asyncHandler(async (req, res) => {
    const payload = attendanceUpdateSchema.parse(req.body);
    const result = await updateAttendance(
        req.params.id,
        payload,
        req.user._id
    );
    return res.status(200).json(result);
});
export const deleteAttendanceController = asyncHandler(async (req, res) => {
    const result = await deleteAttendance(
        req.params.id,
        req.user._id
    );
    return res.status(200).json(result);
});
