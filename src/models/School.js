import mongoose from "mongoose";
import BaseFields from "./base/BaseModel.js";

const schoolSchema = new mongoose.Schema(
  {
    ...BaseFields,

    schoolName: {
      type: String,
      required: true,
      trim: true,
    },

    schoolCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    logo: {
      type: String,
      default: "",
    },

    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    domain: {
      type: String,
      trim: true,
    },
    sealImage: {
      type: String,
    },
    principalSignature: {
      type: String,
    },
    timezone: {
      type: String,
      default: "Asia/Dhaka",
    },
  },
  {
    timestamps: true,
  }
);

const School = mongoose.model("School", schoolSchema);

export default School;