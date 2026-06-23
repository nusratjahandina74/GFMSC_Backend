import { createSubjectService } from "../services/subjectService.js";

export const createSubject = async (
  req,
  res
) => {
  try {
    const result =
      await createSubjectService(
        req.body,
        req.schoolId
      );

    return res.status(201).json({
      success: true,
      message:
        "Subject created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};