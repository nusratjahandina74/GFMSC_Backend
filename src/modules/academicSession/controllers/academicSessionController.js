import {
  createAcademicSessionSchema,
} from "../validations/academicSessionValidation.js";

import {
  createAcademicSessionService,
} from "../services/academicSessionService.js";

export const createAcademicSession =
  async (req, res) => {
    try {
      const result =
        createAcademicSessionSchema.safeParse(
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

      const session =
        await createAcademicSessionService(
          result.data,
          req.schoolId
        );

      return res.status(201).json({
        success: true,

        message:
          "Academic session created successfully",

        data: session,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };