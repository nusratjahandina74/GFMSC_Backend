import Attendance from "../models/Attendance.js";
export const create = async (data,session) => {
const attendance = await Attendance.create([data],{session,});
return attendance[0];
};
export const bulkCreateAttendance = async (payload,options = {}) => {
return Attendance.insertMany(payload,{ordered: false,...options,});
};
export const findAttendance = (filter,projection = {},options = {}) => {
return Attendance.findOne(filter,projection,options);
};
export const findAttendanceById = (id) => {
    return Attendance.findById(id).populate("studentId","fullName schoolStudentId").populate("markedBy","name role email")
        .populate(
           "verifiedBy",
            "name role email"
        )
        .populate(
            "attendanceSessionId",
            "attendanceDate classId sectionId status"
        )
        .lean();
};
export const findAttendances = (filter = {},options = {}) => {
const {
        page = 1,
        limit = 20,
        sort = {attendanceDate: -1,},
    } = options;
    return Attendance.find({...filter,isDeleted: false,})
        .sort(sort)
        .skip(
          (page - 1) * limit
        )
        .limit(limit)
        .populate(
          "studentId",
          "fullName schoolStudentId"
        )
        .populate(
          "markedBy",
          "name role"
        )
        .populate(
          "verifiedBy",
          "name role"
        )
        .populate(
          "attendanceSessionId",
          "attendanceDate classId sectionId"
        )
        .lean();
};
export const countAttendances = (filter = {}) => {
  return Attendance.countDocuments({...filter,isDeleted: false,});
};
export const countAttendanceByStatus = (filter = {}) => {
  return Attendance.countDocuments({
    ...filter,
    isDeleted: false,
  });
};
export const findAttendanceByFilter = (filter = {},options = {}) => {
    const {
        page = 1,
        limit = 20,
        sort = {attendanceDate: -1,},
    } = options;
    return Attendance.find({...filter,isDeleted: false,})
        .sort(sort)
        .skip(
          (page - 1) * limit
        )
        .limit(limit)
        .populate(
          "studentId",
          "fullName schoolStudentId"
        )
        .populate(
          "markedBy",
          "name role"
        )
        .populate(
          "verifiedBy",
          "name role"
        )
        .populate(
          "attendanceSessionId",
          "attendanceDate classId sectionId"
        )
        .lean();
};
export const findDuplicateAttendance = async ({schoolId,studentId,attendanceDate,},session = null) => {
  return Attendance.findOne({
    schoolId,
    studentId,
    attendanceDate,
    isDeleted: false,
    }).session(session);
};
export const attendanceExists = (filter) => {
    return Attendance.exists({...filter,isDeleted: false,});
};
export const updateAttendance = (filter,payload,options = {}) => {
  return Attendance.findOneAndUpdate(filter,payload,
    {
      new: true,
      runValidators: true,
      ...options,
      }
    );
};
export const softDeleteAttendance = (filter,userId,options = {}) => {
  return Attendance.findOneAndUpdate(
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
    });
};
export const deleteAttendance = (filter,session = null) => {
  return Attendance.deleteOne(filter).session(session);
};
export const lockAttendance = (filter,options = {}) => {
  return Attendance.updateMany(
    {
      ...filter,
      isDeleted: false,
    },
    {
      isLocked: true,
    },
      options
  );
};
export const unlockAttendance = (filter,options = {}) => {
  return Attendance.updateMany(
    {
      ...filter,
      isDeleted: false,
    },
    {
      isLocked: false,
    },
      options
    );
};
