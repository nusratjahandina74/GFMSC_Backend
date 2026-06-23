import mongoose from "mongoose";

const promotionLogSchema = new mongoose.Schema(
    {
        schoolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School",
            required: true,
        },

        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },

        fromSessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicSession",
        },

        toSessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicSession",
        },

        fromClassId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
        },

        toClassId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
        },

        fromSectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        },

        toSectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        },

        previousRoll: Number,

        newRoll: Number,

        promotedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        remarks: String,
    },
    {
        timestamps: true,
    }
);

promotionLogSchema.index({
    schoolId: 1,
    createdAt: -1,
});

const PromotionLog = mongoose.model(
    "PromotionLog",
    promotionLogSchema
);

export default PromotionLog;