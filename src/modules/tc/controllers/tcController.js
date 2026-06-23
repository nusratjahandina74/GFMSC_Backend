import {
  generateTCSchema,
} from "../validations/tcValidation.js";

import {
  generateTCService,
} from "../services/generateTCService.js";

import TransferCertificate
from "../models/TransferCertificate.js";

export const generateTC =
  async (req, res) => {
    try {

      const result =
        generateTCSchema.safeParse(
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

      const tc =
        await generateTCService(
          result.data,
          req.schoolId,
          req.user._id
        );

      return res.status(201).json({
        success: true,
        message:
          "Transfer Certificate Generated",
        data: tc,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };
export const verifyTC =
  async (req, res) => {

    const tc =
      await TransferCertificate.findOne({
        verificationToken:
          req.params.token,
      })
      .populate("studentId");

    if (!tc) {
      return res.status(404).json({
        success: false,
        message:
          "Certificate not found",
      });
    }

    return res.json({
      success: true,
      verified: true,
      data: tc,
    });
  };