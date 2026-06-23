import {
  promoteStudentSchema,
} from "../validations/promotionValidation.js";

import {
  promoteStudentService,
} from "../services/promotionService.js";
import {
  bulkPromotionSchema
} from "../validations/promotionValidation.js";

import {
  bulkPromotionService
} from "../services/bulkPromotionService.js";

export const promoteStudent =
  async (req, res) => {
    try {
      const result =
        promoteStudentSchema.safeParse(
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

      const promoted =
        await promoteStudentService(
          result.data,
          req.schoolId
        );

      return res.status(200).json({
        success: true,

        message:
          "Student promoted successfully",

        data: promoted,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };
export const bulkPromoteStudents =
  async (req, res) => {
    try {

      const result =
        bulkPromotionSchema.safeParse(
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

      const promotedCount =
        await bulkPromotionService(
          result.data,
          req.schoolId,
          req.user._id
        );

      return res.status(200).json({
        success: true,

        message:
          "Students promoted successfully",

        promotedCount,
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
        stack: error.stack,
      });
    }
  };