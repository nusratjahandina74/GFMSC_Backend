import Subject from "../models/Subject.js";

export const createSubjectRepo = async (
  payload
) => {
  return await Subject.create(payload);
};

export const findSubjectRepo = async (
  schoolId,
  classId,
  subjectCode
) => {
  return await Subject.findOne({
    schoolId,
    classId,
    subjectCode,
    isDeleted: false,
  });
};

export const getSubjectsRepo = async (
  filters
) => {
  return await Subject.find(filters);
};