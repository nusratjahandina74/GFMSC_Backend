import mongoose from "mongoose";
import {
  ATTENDANCE_STATUS,
  ATTENDANCE_METHOD,
} from "../constants/attendanceConstants.js";

const attendanceSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    attendanceSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AttendanceSession",
      required: true,
    },

    attendanceDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(ATTENDANCE_STATUS),
      required: true,
      default: ATTENDANCE_STATUS.PRESENT,
    },

    checkInTime: {
      type: Date,
      default: null,
    },

    checkOutTime: {
      type: Date,
      default: null,
    },

    method: {
      type: String,
      enum: Object.values(ATTENDANCE_METHOD),
      default: ATTENDANCE_METHOD.MANUAL,
    },

    deviceInfo: {
      platform: String,
      deviceId: String,
      ipAddress: String,
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    isLocked: {
      type: Boolean,
      default: false,
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
| Compound Indexes
|--------------------------------------------------------------------------
*/

attendanceSchema.index(
  {
    schoolId: 1,
    attendanceDate: 1,
    studentId: 1,
  },
  {
    unique: true,
  }
);

attendanceSchema.index({
  schoolId: 1,
  attendanceSessionId: 1,
});

attendanceSchema.index({
  schoolId: 1,
  status: 1,
});

attendanceSchema.index({
  schoolId: 1,
  createdAt: -1,
});

attendanceSchema.index({
  studentId: 1,
  attendanceDate: -1,
});

const Attendance = mongoose.model(
  "Attendance",
  attendanceSchema
);

export default Attendance;