import {
  createAcademicHistorySchema,
} from "../validations/studentAcademicHistoryValidation.js";

import {
  createAcademicHistoryService,
} from "../services/studentAcademicHistoryService.js";

export const createAcademicHistory =
  async (req, res) => {
    try {
      const result =
        createAcademicHistorySchema.safeParse(
          req.body
        );

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message:
            result.error.errors[0]
              .message,
        });
      }

      const history =
        await createAcademicHistoryService(
          result.data,
          req.schoolId
        );

      return res.status(201).json({
        success: true,
        message:
          "Academic history created successfully",
        data: history,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };