import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    academicSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicSession",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    classCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    capacity: {
      type: Number,
      default: 50,
    },

    shift: {
      type: String,
      enum: ["Morning", "Day", "Evening"],
      default: "Day",
    },

    version: {
      type: String,
      enum: ["Bangla", "English", "Madrasa"],
      default: "Bangla",
    },

    group: {
      type: String,
      enum: ["None", "Science", "Commerce", "Arts"],
      default: "None",
    },

    classTeacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
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

classSchema.index(
  {
    schoolId: 1,
    academicSessionId: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

const Class = mongoose.model("Class", classSchema);

export default Class;