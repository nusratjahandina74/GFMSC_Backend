import mongoose from "mongoose";

const BaseFields = {
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    index: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "archived"],
    default: "active",
  },
};

export default BaseFields;