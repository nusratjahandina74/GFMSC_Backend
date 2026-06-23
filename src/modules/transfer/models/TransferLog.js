import mongoose from "mongoose";

const transferLogSchema =
  new mongoose.Schema(
    {
      schoolId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true,
      },

      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },

      fromClassId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },

      fromSectionId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },

      toClassId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },

      toSectionId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },

      reason: String,

      transferredBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );
transferLogSchema.index({
    schoolId: 1,
    createdAt: -1,
});
export default mongoose.model(
  "TransferLog",
  transferLogSchema,
);