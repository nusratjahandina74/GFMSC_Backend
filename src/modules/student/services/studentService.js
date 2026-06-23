import Student from "../models/Student.js";
import Class from "../../academic/class/models/Class.js";
import StudentAcademicProfile from "../models/StudentAcademicProfile.js";
import { createAuditLog } from "../../audit/services/auditService.js";
export const createStudentService =
  async (payload, schoolId) => {
    const existingBC =
      await Student.findOne({
        birthCertificateNo:
          payload.birthCertificateNo,
      });

    if (existingBC) {
      throw new Error(
        "Birth certificate already exists"
      );
    }

    const existingPhone =
      await Student.findOne({
        phone: payload.phone,
      });

    if (existingPhone) {
      throw new Error(
        "Phone already exists"
      );
    }

    const targetClass =
      await Class.findById(
        payload.classId
      );

    if (!targetClass) {
      throw new Error(
        "Class not found"
      );
    }

    const totalStudents =
      await StudentAcademicProfile.countDocuments(
        {
          classId: payload.classId,
          sectionId:
            payload.sectionId,
        }
      );

    if (
      totalStudents >=
      targetClass.capacity
    ) {
      throw new Error(
        "Class capacity full"
      );
    }

    const schoolStudentId =
      `STD-${Date.now()}`;

    const student =
      await Student.create({

        schoolId,

        schoolStudentId,

        fullName: payload.fullName,

        birthCertificateNo:
          payload.birthCertificateNo,

        phone: payload.phone,

        gender: payload.gender,

        dateOfBirth:
          payload.dateOfBirth,

        address: payload.address,

      });
    const rollNumber =
      totalStudents + 1;


    await StudentAcademicProfile.create({

      schoolId,

      studentId: student._id,

      classId: payload.classId,

      sectionId: payload.sectionId,

      rollNumber,

      schoolStudentId,

    });

    return {
      student,
      rollNumber,
      schoolStudentId,
    };
  };
export const reactivateStudentService =
  async (

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

    student.lifecycleStatus = "Active";

    student.currentClassId =
      payload.classId;

    student.currentSectionId =
      payload.sectionId;

    student.currentAcademicSessionId =
      payload.sessionId;

    await student.save();

    await createAuditLog({

      schoolId,

      userId,

      action:
        "REACTIVATE_STUDENT",

      module:
        "Student",

      entityId:
        student._id,

    });

    return student;

  };
export const deleteStudentService = async (
  payload,
  schoolId,
  userId
) => {

  const student = await Student.findOne({
    _id: payload.studentId,
    schoolId,
    isDeleted: false,
  });

  if (!student) {
    throw new Error("Student not found");
  }

  student.isDeleted = true;
  student.deletedAt = new Date();
  student.deletedBy = userId;

  await student.save();

  await createAuditLog({
    schoolId,
    userId,
    action: "DELETE_STUDENT",
    module: "Student",
    entityId: student._id,
  });

  return student;
};