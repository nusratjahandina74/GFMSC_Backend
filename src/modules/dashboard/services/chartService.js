import Student
  from "../../student/models/Student.js";
import PromotionLog
  from "../../promotion/models/PromotionLog.js";

import TransferLog
  from "../../transfer/models/TransferLog.js";
import {
  monthlyAggregationPipeline,
} from "../utils/dashboardAggregate.js";

import {
  formatMonthlyData,
} from "../utils/monthFormatter.js";
import {
  formatChartData,
} from "../utils/chartFormatter.js";
export const getAdmissionTrendService =
  async (schoolId) => {

    const result =
      await Student.aggregate(
        monthlyAggregationPipeline({
          schoolId,
          isDeleted: false,
        })
      );

    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return result.map((item) => ({
      month: months[item._id],
      count: item.count,
    }));

  };
export const
  getPromotionTrendService =
    async (schoolId) => {

      const result =
        await PromotionLog.aggregate(
          monthlyAggregationPipeline({
            schoolId,
          })
        );

      return formatMonthlyData(
        result
      );

    };
export const
  getTransferTrendService =
    async (schoolId) => {

      const result =
        await TransferLog.aggregate(
          monthlyAggregationPipeline({
            schoolId,
          })
        );

      return formatMonthlyData(
        result
      );

    };

export const
  getLifecycleDistributionService =
    async (schoolId) => {

      const result =
        await Student.aggregate([

          {

            $match: {

              schoolId,

              isDeleted: false,

            },

          },

          {

            $group: {

              _id: "$lifecycleStatus",

              count: {

                $sum: 1,

              },

            },

          },

          {

            $sort: {

              _id: 1,

            },

          },

        ]);

      return formatChartData(

        result,

        "status"

      );

    };
export const
  getGenderDistributionService =
    async (schoolId) => {

      const result =
        await Student.aggregate([

          {

            $match: {

              schoolId,

              isDeleted: false,

            },

          },

          {

            $group: {

              _id: "$gender",

              count: {

                $sum: 1,

              },

            },

          },

          {

            $sort: {

              _id: 1,

            },

          },

        ]);

      return formatChartData(

        result,

        "gender"

      );

    };
export const
  getClassWiseStudentsService =
    async (schoolId) => {

      const result =
        await Student.aggregate([

          {

            $match: {

              schoolId,

              isDeleted: false,

            },

          },

          {

            $lookup: {

              from: "classes",

              localField:

                "currentClassId",

              foreignField: "_id",

              as: "class",

            },

          },

          {

            $unwind: "$class",

          },

          {

            $group: {

              _id:

                "$class.name",

              count: {

                $sum: 1,

              },

            },

          },

          {

            $sort: {

              _id: 1,

            },

          },

        ]);

      return formatChartData(

        result,

        "class",

        "students"

      );

    };
export const
  getRevenueService =
    async () => {

      return [];

    };