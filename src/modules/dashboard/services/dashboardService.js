
import {
    getDashboardCountersService,
} from "./counterService.js";

import {
    getRecentActivitiesService,
} from "./activityService.js";

import {

    getAdmissionTrendService,

    getPromotionTrendService,

    getTransferTrendService,

    getLifecycleDistributionService,

    getGenderDistributionService,

    getClassWiseStudentsService,

    getRevenueService,

} from "./chartService.js";

import {
    dashboardResponse,
} from "../utils/dashboardResponse.js";



export const
getDashboardService =
async(schoolId)=>{

   const [

      counters,

      admissions,

      promotions,

      transfers,

      lifecycle,

      gender,

      classWise,

      recent,

   ]=await Promise.all([

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
      )

   ]);

 return dashboardResponse({

    counters,

    charts:{

        admissions,

        promotions,

        transfers,

        lifecycle,

        gender,

        classWise,

    },

    recentActivities:

        recent,

});

};