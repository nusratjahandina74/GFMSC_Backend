import mongoose from "mongoose";

const studentAcademicProfileSchema =
  new mongoose.Schema(
    {
      schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true,
      },

      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
      },

      sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
      },

      rollNumber: {
        type: Number,
        required: true,
      },

      schoolStudentId: {
        type: String,
        required: true,
      },

      academicSessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicSession",
        required: false,
      },

      admissionDate: {
        type: Date,
        default: Date.now,
      },

      status: {
        type: String,
        enum: [
          "Active",
          "Transferred",
          "Graduated",
          "Dropped",
          "Hold",
        ],
        default: "Active",
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

const StudentAcademicProfile =
  mongoose.model(
    "StudentAcademicProfile",
    studentAcademicProfileSchema
  );

export default StudentAcademicProfile;