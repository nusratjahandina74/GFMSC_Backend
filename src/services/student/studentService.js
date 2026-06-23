import {
  createStudentRepo,
  findStudentByRoll,
  getStudentsRepo,
  findStudentByIdRepo,
  updateStudentRepo,
  softDeleteStudentRepo,
  restoreStudentRepo,
} from "../../repositories/studentRepository.js";

// ==============================
// CREATE STUDENT
// ==============================
export const createStudentService = async (
  payload,
  schoolId
) => {
  const existing = await findStudentByRoll(
    schoolId,
    payload.rollNumber
  );

  if (existing) {
    throw new Error(
      "Student with this roll already exists"
    );
  }

  const studentData = {
    ...payload,
    schoolId,
  };

  return await createStudentRepo(studentData);
};

// ==============================
// GET STUDENTS
// ==============================
export const getStudentsService = async (
  schoolId,
  query
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  const filters = {
    schoolId,
    isDeleted: false,
    $or: [
      {
        fullName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        rollNumber: {
          $regex: search,
          $options: "i",
        },
      },
    ],
  };

  const sort = {
    createdAt: -1,
  };

  const { students, total } =
    await getStudentsRepo(
      filters,
      skip,
      limit,
      sort
    );

  return {
    students,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
// ===================================
// UPDATE STUDENT
// ===================================
export const updateStudentService =
  async (
    id,
    payload,
    schoolId
  ) => {
    const student =
      await findStudentByIdRepo(
        id,
        schoolId
      );

    if (!student) {
      throw new Error(
        "Student not found"
      );
    }

    if (payload.rollNumber) {
      const existing =
        await findStudentByRoll(
          schoolId,
          payload.rollNumber
        );

      if (
        existing &&
        existing._id.toString() !== id
      ) {
        throw new Error(
          "Roll number already exists"
        );
      }
    }

    return await updateStudentRepo(
      id,
      schoolId,
      payload
    );
  };

// ===================================
// DELETE STUDENT
// ===================================
export const deleteStudentService =
  async (id, schoolId) => {
    const student =
      await findStudentByIdRepo(
        id,
        schoolId
      );

    if (!student) {
      throw new Error(
        "Student not found"
      );
    }

    return await softDeleteStudentRepo(
      id,
      schoolId
    );
  };

// ===================================
// RESTORE STUDENT
// ===================================
export const restoreStudentService =
  async (id, schoolId) => {
    return await restoreStudentRepo(
      id,
      schoolId
    );
  };
