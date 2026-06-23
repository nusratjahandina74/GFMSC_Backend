import AcademicSession from "../models/AcademicSession.js";

export const createAcademicSessionService =
  async (
    payload,
    schoolId
  ) => {
    const existing =
      await AcademicSession.findOne({
        schoolId,

        sessionName:
          payload.sessionName,

        isDeleted: false,
      });

    if (existing) {
      throw new Error(
        "Session already exists"
      );
    }

    const currentSession =
      await AcademicSession.findOne({
        schoolId,

        isCurrent: true,
      });

    const session =
      await AcademicSession.create({
        schoolId,

        sessionName:
          payload.sessionName,

        startDate:
          payload.startDate,

        endDate:
          payload.endDate,

        isCurrent:
          currentSession
            ? false
            : true,
      });

    return session;
  };