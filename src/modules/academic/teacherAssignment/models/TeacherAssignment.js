import mongoose from "mongoose";

const teacherAssignmentSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    teacherId: {
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

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    isClassTeacher: {
      type: Boolean,
      default: false,
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

teacherAssignmentSchema.index(
  {
    schoolId: 1,
    teacherId: 1,
    classId: 1,
    sectionId: 1,
    subjectId: 1,
  },
  {
    unique: true,
  }
);

const TeacherAssignment = mongoose.model(
  "TeacherAssignment",
  teacherAssignmentSchema
);

export default TeacherAssignment;