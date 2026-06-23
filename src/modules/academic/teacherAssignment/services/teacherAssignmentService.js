import TeacherAssignment from "../models/TeacherAssignment.js";

export const createTeacherAssignmentService =
  async (payload, schoolId) => {
    const exists =
      await TeacherAssignment.findOne({
        schoolId,
        teacherId: payload.teacherId,
        classId: payload.classId,
        sectionId: payload.sectionId,
        subjectId: payload.subjectId,
        isDeleted: false,
      });

    if (exists) {
      throw new Error(
        "Assignment already exists"
      );
    }

    return await TeacherAssignment.create({
      ...payload,
      schoolId,
    });
  };