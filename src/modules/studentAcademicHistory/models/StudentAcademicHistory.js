import mongoose from "mongoose";

const studentAcademicHistorySchema =
  new mongoose.Schema(
    {
      schoolId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "School",
        required: true,
        index: true,
      },

      studentId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "Student",
        required: true,
      },

      academicSessionId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "AcademicSession",
        required: true,
      },

      classId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "Class",
        required: true,
      },

      sectionId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "Section",
      },

      rollNumber: {
        type: Number,
        required: true,
      },

      admissionDate: {
        type: Date,
        default: Date.now,
      },

      status: {
        type: String,
        enum: [
          "Active",
          "Promoted",
          "Transferred",
          "Archived",
        ],
        default: "Active",
      },

      remarks: {
        type: String,
        trim: true,
      },

      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const StudentAcademicHistory =
  mongoose.model(
    "StudentAcademicHistory",
    studentAcademicHistorySchema
  );

export default StudentAcademicHistory;