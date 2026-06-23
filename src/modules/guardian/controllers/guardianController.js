import { createGuardianSchema } from "../validations/guardianValidation.js";

import { createGuardianService } from "../services/guardianService.js";

export const createGuardian =
  async (req, res) => {
    try {
      const result =
        createGuardianSchema.safeParse(
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

      const guardian =
        await createGuardianService(
          result.data,
          req.schoolId
        );

      return res.status(201).json({
        success: true,
        message:
          "Guardian created successfully",
        data: guardian,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };