import {
  createSubjectRepo,
  findSubjectRepo,
} from "../repositories/subjectRepository.js";

export const createSubjectService =
  async (payload, schoolId) => {
    const existing = await findSubjectRepo(
      schoolId,
      payload.classId,
      payload.subjectCode
    );

    if (existing) {
      throw new Error(
        "Subject already exists"
      );
    }

    return await createSubjectRepo({
      ...payload,
      schoolId,
    });
  };