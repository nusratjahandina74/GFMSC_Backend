import bcrypt from "bcryptjs";
import Guardian from "../models/Guardian.js";

import Student from "../../student/models/Student.js";

export const createGuardianService =
  async (payload, schoolId) => {
    const existingPhone =
      await Guardian.findOne({
        phone: payload.phone,
      });

    if (existingPhone) {
      throw new Error(
        "Guardian phone already exists"
      );
    }

    const student =
      await Student.findById(
        payload.studentId
      );

    if (!student) {
      throw new Error(
        "Student not found"
      );
    }
    const hashedPassword =
      await bcrypt.hash(
        payload.password,
        10
      );
    const guardian =
      await Guardian.create({
        schoolId,

        fullName:
          payload.fullName,

        phone: payload.phone,

        password: hashedPassword,

        email: payload.email,

        occupation:
          payload.occupation,

        relation:
          payload.relation,

        address:
          payload.address,

        students: [
          payload.studentId,
        ],
      });

    student.guardianId =
      guardian._id;


    await student.save();

    return guardian;
  };