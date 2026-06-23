import { createStudentSchema, reactivateStudentSchema } from "../validations/studentValidation.js";
import { createStudentService, reactivateStudentService, deleteStudentService } from "../services/studentService.js";
export const createStudent =
  async (req, res) => {
    try {
      const result =
        createStudentSchema.safeParse(
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

      const student =
        await createStudentService(
          result.data,
          req.schoolId
        );

      return res.status(201).json({
        success: true,
        message:
          "Student admitted successfully",
        data: student,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
export const reactivateStudent =
  async (req, res) => {

    try {

      const result =
        reactivateStudentSchema.safeParse(
          req.body
        );

      if (!result.success) {

        return res.status(400).json({

          success: false,

          message:
            result.error.errors[0].message

        });

      }

      const student =
        await reactivateStudentService(

          result.data,

          req.schoolId,

          req.user._id

        );

      return res.json({

        success: true,

        message:
          "Student reactivated",

        data: student,

      });

    }

    catch (error) {

      return res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };
export const deleteStudent = async (req, res) => {
  try {

    const student =
      await deleteStudentService(
        req.body,
        req.schoolId,
        req.user._id
      );

    return res.json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};