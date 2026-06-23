import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        schoolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School",
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        action: {
            type: String,
            required: true,
        },

        module: {
            type: String,
            required: true,
        },

        entityId: {
            type: mongoose.Schema.Types.ObjectId,
        },

        oldData: Object,

        newData: Object,

        ipAddress: String,

        userAgent: String,
    },
    {
        timestamps: true,
    }
);

auditLogSchema.index({
    schoolId: 1,
    createdAt: -1,
});

const AuditLog = mongoose.model(
    "AuditLog",
    auditLogSchema
);

export default AuditLog;