
import Student from "../models/Student.js";

// ===================================
// CREATE STUDENT
// ===================================
export const createStudentRepo = async (
  data
) => {
  return await Student.create(data);
};

// ===================================
// FIND STUDENT BY ROLL
// ===================================
export const findStudentByRoll = async (
  schoolId,
  rollNumber
) => {
  return await Student.findOne({
    schoolId,
    rollNumber,
    isDeleted: false,
  });
};

// ===================================
// GET STUDENTS
// ===================================
export const getStudentsRepo = async (
  filters,
  skip,
  limit,
  sort
) => {
  const students = await Student.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total =
    await Student.countDocuments(filters);

  return {
    students,
    total,
  };
};
// ===================================
// FIND STUDENT BY ID
// ===================================
export const findStudentByIdRepo = async (
  id,
  schoolId
) => {
  return await Student.findOne({
    _id: id,
    schoolId,
    isDeleted: false,
  });
};

// ===================================
// UPDATE STUDENT
// ===================================
export const updateStudentRepo = async (
  id,
  schoolId,
  payload
) => {
  return await Student.findOneAndUpdate(
    {
      _id: id,
      schoolId,
      isDeleted: false,
    },
    payload,
    {
      new: true,
    }
  );
};

// ===================================
// SOFT DELETE
// ===================================
export const softDeleteStudentRepo =
  async (id, schoolId) => {
    return await Student.findOneAndUpdate(
      {
        _id: id,
        schoolId,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
  };

// ===================================
// RESTORE STUDENT
// ===================================
export const restoreStudentRepo =
  async (id, schoolId) => {
    return await Student.findOneAndUpdate(
      {
        _id: id,
        schoolId,
      },
      {
        isDeleted: false,
      },
      {
        new: true,
      }
    );
  };