import AuditLog from "../models/AuditLog.js";

export const createAuditLog = async ({
    schoolId,
    userId,
    action,
    module,
    entityId,
    oldData = null,
    newData = null,
    ipAddress = "",
    userAgent = "",
}) => {

    return await AuditLog.create({

        schoolId,
        userId,
        action,
        module,
        entityId,
        oldData,
        newData,
        ipAddress,
        userAgent,

    });

};