import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
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

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    capacity: {
      type: Number,
      default: 50,
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

sectionSchema.index(
  {
    schoolId: 1,
    classId: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

const Section = mongoose.model(
  "Section",
  sectionSchema
);

export default Section;