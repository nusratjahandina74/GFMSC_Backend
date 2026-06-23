import {
    getStudentMigrationLogService,
} from "../services/migrationLogService.js";

export const getStudentMigrationLog = async (
    req,
    res
) => {
    try {

        const logs =
            await getStudentMigrationLogService(
                req.params.studentId,
                req.schoolId
            );

        res.status(200).json({
            success: true,
            count: logs.length,
            data: logs,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};