import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: false,
    },

    className: {
      type: String,
      required: true,
      trim: true,
    },

    classCode: {
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

const Class = mongoose.model("Class", classSchema);

export default Class;