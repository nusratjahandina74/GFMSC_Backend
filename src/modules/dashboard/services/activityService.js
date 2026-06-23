import AuditLog
  from "../../audit/models/AuditLog.js";
export const
  getRecentActivitiesService =
    async (schoolId) => {

      return await AuditLog.find({

        schoolId,

      })

        .sort({

          createdAt: -1,

        })

        .limit(10)

        .populate(
          "userId",
          "name role"
        )

        .lean();

    };