import Student from "../../student/models/Student.js";
import PromotionLog from "../models/PromotionLog.js";

export const bulkPromotionService = async (
  payload,
  schoolId,
  userId
) => {
  console.log("School ID:", schoolId);
  console.log("Payload:", payload);

  const students = await Student.find({
    schoolId,
    currentClassId: payload.fromClassId,
    currentSectionId: payload.fromSectionId,
    isDeleted: false,
  });
// const students = await Student.find({
//   schoolId,
//   isDeleted: false,
// });

  console.log("Students Found:", students);

  if (!students.length) {
    throw new Error("No students found");
  }

  let roll = 1;

  for (const student of students) {
    await PromotionLog.create({
      schoolId,

      studentId: student._id,

      fromSessionId:
        payload.fromAcademicSessionId,

      toSessionId:
        payload.toAcademicSessionId,

      fromClassId:
        payload.fromClassId,

      toClassId:
        payload.toClassId,

      fromSectionId:
        payload.fromSectionId,

      toSectionId:
        payload.toSectionId,

      previousRoll:
        student.currentRollNumber,

      newRoll: roll,

      promotedBy: userId,

      remarks: "Bulk promoted",
    });

student.currentAcademicSessionId = payload.toAcademicSessionId;

student.currentClassId = payload.toClassId;

student.currentSectionId = payload.toSectionId;

student.currentRollNumber = roll;


    await student.save();

    roll++;
  }

  return students.length;
  const allStudents = await Student.find({});

console.log("All Students:", allStudents);
};