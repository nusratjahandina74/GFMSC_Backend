import mongoose from "mongoose";

const attendanceSessionSchema =
  new mongoose.Schema(
    {
      schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true,
      },

      academicSessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicSession",
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

      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        default: null,
      },

      teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
      },

      attendanceDate: {
        type: Date,
        required: true,
      },

      startTime: Date,

      endTime: Date,

      status: {
        type: String,
        enum: [
          "Open",
          "Closed",
        ],
        default: "Open",
      },

      remarks: String,

      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      deletedAt: {
        type: Date,
        default: null,
      },
      deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

attendanceSessionSchema.index({
  schoolId: 1,
  attendanceDate: 1,
  classId: 1,
  sectionId: 1,
  status: 1,
});

attendanceSessionSchema.index({
  schoolId: 1,
  academicSessionId: 1,
  classId: 1,
  sectionId: 1,
  teacherId: 1,
  attendanceDate: 1,
});

const AttendanceSession = mongoose.model(
  "AttendanceSession",
  attendanceSessionSchema
);

export default AttendanceSession;
