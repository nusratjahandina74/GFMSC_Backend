import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    subjectName: {
      type: String,
      required: true,
      trim: true,
    },

    subjectCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    subjectType: {
      type: String,
      enum: ["Mandatory", "Optional"],
      default: "Mandatory",
    },

    fullMarks: {
      type: Number,
      default: 100,
    },

    passMarks: {
      type: Number,
      default: 33,
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

subjectSchema.index(
  {
    schoolId: 1,
    classId: 1,
    subjectCode: 1,
  },
  {
    unique: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;