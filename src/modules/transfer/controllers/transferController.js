import {
  transferStudentSchema,
} from "../validations/transferValidation.js";

import {
  transferStudentService,
} from "../services/transferService.js";

export const transferStudent =
  async (req, res) => {
    try {

      const result =
        transferStudentSchema.safeParse(
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

      const transfer =
        await transferStudentService(
          result.data,
          req.schoolId,
          req.user._id
        );

      return res.status(200).json({
        success: true,
        message:
          "Student transferred successfully",
        data: transfer,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };