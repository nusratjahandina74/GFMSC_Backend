import AttendanceSession from "../models/AttendanceSession.js";

const defaultPopulate = (query) =>
  query
    .populate("academicSessionId", "sessionName")
    .populate("classId", "className classCode")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName subjectCode")
    .populate("teacherId", "fullName email")
    .populate("createdBy", "fullName email role");

export const createAttendanceSession = async (
  payload,
  options = {}
) => {
  const session = await AttendanceSession.create(
    [payload],
    options
  );

  return session[0];
};

export const findAttendanceSession = (
  filter,
  projection = {},
  options = {}
) => {
  return AttendanceSession.findOne(
    {
      ...filter,
      isDeleted: false,
    },
    projection,
    options
  );
};

export const findAttendanceSessionById = (
  id,
  schoolId
) => {
  return defaultPopulate(
    AttendanceSession.findOne({
      _id: id,
      schoolId,
      isDeleted: false,
    })
  ).lean();
};

export const findAttendanceSessions = (
  filter = {},
  options = {}
) => {
  const {
    page = 1,
    limit = 20,
    sort = { attendanceDate: -1, createdAt: -1 },
  } = options;

  return defaultPopulate(
    AttendanceSession.find({
      ...filter,
      isDeleted: false,
    })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
  ).lean();
};

export const countAttendanceSessions = (
  filter = {}
) => {
  return AttendanceSession.countDocuments({
    ...filter,
    isDeleted: false,
  });
};

export const updateAttendanceSession = (
  filter,
  payload,
  options = {}
) => {
  return AttendanceSession.findOneAndUpdate(
    {
      ...filter,
      isDeleted: false,
    },
    payload,
    {
      new: true,
      runValidators: true,
      ...options,
    }
  );
};

export const softDeleteAttendanceSession = (
  filter,
  userId,
  options = {}
) => {
  return AttendanceSession.findOneAndUpdate(
    {
      ...filter,
      isDeleted: false,
    },
    {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: userId,
    },
    {
      new: true,
      runValidators: true,
      ...options,
    }
  );
};
