import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: false,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    sectionName: {
      type: String,
      required: true,
      trim: true,
    },

    capacity: {
      type: Number,
      default: 50,
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

const Section = mongoose.model(
  "Section",
  sectionSchema
);

export default Section;