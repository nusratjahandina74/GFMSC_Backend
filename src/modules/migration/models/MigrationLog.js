import mongoose from "mongoose";

const migrationLogSchema =
  new mongoose.Schema(
    {
      schoolId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "School",
      },

      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },

      migrationType: {
        type: String,
        enum: [
          "Promotion",
          "Transfer",
          "Reactivation",
        ],
      },

      fromSessionId:
      mongoose.Schema.Types.ObjectId,

      toSessionId:
      mongoose.Schema.Types.ObjectId,

      remarks: String,
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "MigrationLog",
  migrationLogSchema
);