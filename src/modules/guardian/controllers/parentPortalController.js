import Guardian from "../models/Guardian.js";

export const getMyChildren =
  async (req, res) => {
    try {
      const guardian =
        await Guardian.findById(
          req.user.id
        ).populate("students");

      return res.json({
        success: true,
        data: guardian.students,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };