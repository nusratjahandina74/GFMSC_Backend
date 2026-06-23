import PromotionLog from "../../promotion/models/PromotionLog.js";
import TransferLog from "../../transfer/models/TransferLog.js";
import AuditLog from "../../audit/models/AuditLog.js";

export const getStudentMigrationLogService = async (
    studentId,
    schoolId
) => {

    const promotions = await PromotionLog.find({
        schoolId,
        studentId,
    }).lean();

    const transfers = await TransferLog.find({
        schoolId,
        studentId,
    }).lean();

    const audits = await AuditLog.find({
        schoolId,
        entityId: studentId,
    }).lean();

    const activities = [
        ...promotions.map(item => ({
            type: "Promotion",
            date: item.createdAt,
            data: item,
        })),

        ...transfers.map(item => ({
            type: "Transfer",
            date: item.createdAt,
            data: item,
        })),

        ...audits.map(item => ({
            type: item.action,
            date: item.createdAt,
            data: item,
        })),
    ];

    activities.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );

    return activities;
};