import { createTeacherAssignmentService } from "../services/teacherAssignmentService.js";

export const createTeacherAssignment =
  async (req, res) => {
    try {
      const result =
        await createTeacherAssignmentService(
          req.body,
          req.schoolId
        );

      return res.status(201).json({
        success: true,
        message:
          "Teacher assigned successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };