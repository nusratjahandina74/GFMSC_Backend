import MigrationLog from "../models/MigrationLog.js";

export const getStudentMigrationLogs =
  async (req, res) => {
    try {

      const logs =
        await MigrationLog.find({
          studentId:
            req.params.studentId,
        }).sort({
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        data: logs,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };