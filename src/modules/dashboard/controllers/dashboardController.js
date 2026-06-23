// Future

// const cacheKey = `dashboard:${schoolId}`;

// const cached = await redis.get(cacheKey);

// if(cached){

// return JSON.parse(cached);

// }

// await redis.set(cacheKey,data);

// return data;
import {
  dashboardQuerySchema,
} from "../validations/dashboardValidation.js";

import {

getDashboardService,

} from "../services/dashboardService.js";

import {

getDashboardCountersService,

} from "../services/counterService.js";

import {

getRecentActivitiesService,

} from "../services/activityService.js";

import {

getAdmissionTrendService,

getPromotionTrendService,

getTransferTrendService,

getLifecycleDistributionService,

getGenderDistributionService,

getClassWiseStudentsService,

getRevenueService,

} from "../services/chartService.js";
import { dashboardResponse } from "../utils/dashboardResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const getDashboardCounters =
  async (req, res) => {
    try {

      const data =
        await getDashboardCountersService(
          req.schoolId
        );

      return res.json({
        success: true,
        data,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };

export const getAdmissionTrend =
  async (req, res) => {

    try {

      dashboardQuerySchema.parse(
        req.query
      );

      const data =
        await getAdmissionTrendService(
          req.schoolId
        );

      return res.json({
        success: true,
        data,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };
export const
  getPromotionTrend =
    async (req, res) => {

      try {

        const data =
          await getPromotionTrendService(

            req.schoolId

          );

        return res.json({

          success: true,

          data,

        });

      }

      catch (error) {

        return res.status(500).json({

          success: false,

          message: error.message,

        });

      }

    };
export const
  getTransferTrend =
    async (req, res) => {

      try {

        const data =
          await getTransferTrendService(

            req.schoolId

          );

        return res.json({

          success: true,

          data,

        });

      }

      catch (error) {

        return res.status(500).json({

          success: false,

          message: error.message,

        });

      }

    };
export const
  getRecentActivities =
    async (req, res) => {

      try {

        const data =
          await getRecentActivitiesService(

            req.schoolId

          );

        return res.json({

          success: true,

          data,

        });

      }

      catch (error) {

        return res.status(500).json({

          success: false,

          message: error.message,

        });

      }

    };
export const
  getLifecycleDistribution =
    async (req, res) => {

      try {

        const data =
          await getLifecycleDistributionService(

            req.schoolId

          );

        return res.json({

          success: true,

          data,

        });

      }

      catch (error) {

        return res.status(500).json({

          success: false,

          message: error.message,

        });

      }

    };
export const
  getGenderDistribution =
    async (req, res) => {

      try {

        const data =
          await getGenderDistributionService(

            req.schoolId

          );

        return res.json({

          success: true,

          data,

        });

      }

      catch (error) {

        return res.status(500).json({

          success: false,

          message: error.message,

        });

      }

    };
export const
  getClassWiseStudents =
    async (req, res) => {

      try {

        const data =
          await getClassWiseStudentsService(

            req.schoolId

          );

        return res.json({

          success: true,

          data,

        });

      }

      catch (error) {

        return res.status(500).json({

          success: false,

          message: error.message,

        });

      }

    };
export const
  getRevenue =
    async (req, res) => {

      try {

        const data =
          await getRevenueService();

        return res.json({

          success: true,

          data,

        });

      }

      catch (error) {

        return res.status(500).json({

          success: false,

          message: error.message,

        });

      }

    };

export const getDashboard = async (
  req,
  res
) => {

  try {

    const schoolId = req.schoolId;

    const [

      counters,

      admissions,

      promotions,

      transfers,

      lifecycle,

      gender,

      classWise,

      recent,

    ] = await Promise.all([

      getDashboardCountersService(
        schoolId
      ),

      getAdmissionTrendService(
        schoolId
      ),

      getPromotionTrendService(
        schoolId
      ),

      getTransferTrendService(
        schoolId
      ),

      getLifecycleDistributionService(
        schoolId
      ),

      getGenderDistributionService(
        schoolId
      ),

      getClassWiseStudentsService(
        schoolId
      ),

      getRecentActivitiesService(
        schoolId
      ),

    ]);

    return res.json({

      success: true,

      data: dashboardResponse({

        counters,

        charts: {

          admissions,

          promotions,

          transfers,

          lifecycle,

          gender,

          classWise,

        },

        recentActivities: recent,

      }),

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
