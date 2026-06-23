import mongoose from "mongoose";

const transferCertificateSchema =
  new mongoose.Schema(
    {
      schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true,
      },

      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },

      tcNumber: {
        type: String,
        required: true,
        unique: true,
      },
      issueDate: {
        type: Date,
        default: Date.now,
      },

      reason: {
        type: String,
        required: true,
      },

      remarks: {
        type: String,
      },
      pdfUrl: {
        type: String,
      },
      status: {
        type: String,
        enum: [
          "Generated",
          "Issued",
          "Cancelled",
        ],
        default: "Generated",
      },
      qrCodeUrl: {
        type: String,
      },

      verificationToken: {
        type: String,
        unique: true,
      },

      generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "TransferCertificate",
  transferCertificateSchema
);