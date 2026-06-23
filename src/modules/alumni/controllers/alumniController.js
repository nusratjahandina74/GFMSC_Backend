import {
  archiveStudentSchema,
} from "../validations/alumniValidation.js";

import {
  archiveStudentService,
} from "../services/alumniService.js";

export const archiveStudent = async (
  req,
  res
) => {
  try {
    const result =
      archiveStudentSchema.safeParse(
        req.body
      );

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message:
          result.error.errors[0].message,
      });
    }

    const student =
      await archiveStudentService(
        result.data,
        req.schoolId,
        req.user._id
      );

    return res.status(200).json({
      success: true,
      message:
        "Student archived successfully",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};