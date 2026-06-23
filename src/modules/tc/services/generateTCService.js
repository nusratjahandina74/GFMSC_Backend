import QRCode from "qrcode";

import Student from "../../student/models/Student.js";
import TransferCertificate from "../models/TransferCertificate.js";

import {
  generateTCNumber,
} from "../utils/generateTCNumber.js";

import {
  generateVerificationToken,
} from "../utils/generateVerificationToken.js";

export const generateTCService = async (
  payload,
  schoolId,
  userId
) => {

  const student =
    await Student.findOne({
      _id: payload.studentId,
      schoolId,
      isDeleted: false,
    });

  if (!student) {
    throw new Error(
      "Student not found"
    );
  }

  const existingTC =
    await TransferCertificate.findOne({
      studentId: student._id,
      status: {
        $ne: "Cancelled",
      },
    });

  if (existingTC) {
    throw new Error(
      "Transfer Certificate already exists for this student"
    );
  }

  const tcNumber =
    await generateTCNumber();

  const verificationToken =
    generateVerificationToken();

  const verifyUrl =
    `${process.env.CLIENT_URL}/verify/${verificationToken}`;

  const qrCodeUrl =
    await QRCode.toDataURL(
      verifyUrl
    );

  const tc =
    await TransferCertificate.create({
      schoolId,

      studentId:
        student._id,

      tcNumber,

      verificationToken,

      qrCodeUrl,

      reason:
        payload.reason,

      remarks:
        payload.remarks,

      generatedBy:
        userId,

      status:
        "Generated",
    });

  return tc;
};