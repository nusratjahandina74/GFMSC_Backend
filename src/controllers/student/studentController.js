import {
  createStudentService,
  getStudentsService,
  updateStudentService,
  deleteStudentService,
  restoreStudentService,
} from "../../services/student/studentService.js";

import {
  createStudentSchema,
  updateStudentSchema,
} from "../../validations/studentValidation.js";

// ===================================
// CREATE STUDENT
// ===================================
export const createStudent = async (
  req,
  res
) => {
  try {
    const result =
      createStudentSchema.safeParse(req.body);

   if (!result.success) {
  return res.status(400).json({
    success: false,
    message: result.error.issues[0].message,
  });
}

    const student =
      await createStudentService(
        result.data,
        req.schoolId
      );

    return res.status(201).json({
      success: true,
      message:
        "Student created successfully",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// GET STUDENTS
// ===================================
export const getStudents = async (
  req,
  res
) => {
  try {
    const data = await getStudentsService(
      req.schoolId,
      req.query
    );

    return res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===================================
// UPDATE STUDENT
// ===================================
export const updateStudent = async (
  req,
  res
) => {
  try {
    const result =
      updateStudentSchema.safeParse(
        req.body
      );

    if (!result.success) {
  return res.status(400).json({
    success: false,
    message: result.error.issues[0].message,
  });
}

    const student =
      await updateStudentService(
        req.params.id,
        result.data,
        req.schoolId
      );

    return res.status(200).json({
      success: true,
      message:
        "Student updated successfully",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// DELETE STUDENT
// ===================================
export const deleteStudent = async (
  req,
  res
) => {
  try {
    await deleteStudentService(
      req.params.id,
      req.schoolId
    );

    return res.status(200).json({
      success: true,
      message:
        "Student deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// RESTORE STUDENT
// ===================================
export const restoreStudent = async (
  req,
  res
) => {
  try {
    const student =
      await restoreStudentService(
        req.params.id,
        req.schoolId
      );

    return res.status(200).json({
      success: true,
      message:
        "Student restored successfully",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};