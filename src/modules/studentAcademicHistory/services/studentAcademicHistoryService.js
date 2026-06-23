import StudentAcademicHistory from "../models/StudentAcademicHistory.js";

export const createAcademicHistoryService =
  async (
    payload,
    schoolId
  ) => {
    const history =
      await StudentAcademicHistory.create(
        {
          schoolId,
          ...payload,
        }
      );

    return history;
  };