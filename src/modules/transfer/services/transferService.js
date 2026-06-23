import Student from
  "../../student/models/Student.js";

import TransferLog from
  "../models/TransferLog.js";

export const transferStudentService =
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

    const oldClass =
      student.currentClassId;

    const oldSection =
      student.currentSectionId;

    student.currentClassId =
      payload.newClassId;

    student.currentSectionId =
      payload.newSectionId;

    await student.save();
    await createAuditLog({
      schoolId,

      userId,

      action:
        "TRANSFER_STUDENT",

      module:
        "StudentTransfer",

      entityId:
        student._id,

      oldData: {
        classId:
          oldClass,

        sectionId:
          oldSection,
      },

      newData: {
        classId:
          payload.newClassId,

        sectionId:
          payload.newSectionId,
      },
    });
    await TransferLog.create({
      schoolId,

      studentId:
        student._id,

      fromClassId:
        oldClass,

      fromSectionId:
        oldSection,

      toClassId:
        payload.newClassId,

      toSectionId:
        payload.newSectionId,

      reason:
        payload.reason,

      transferredBy:
        userId,
    });

    return student;
  };