import express
    from "express";

import authMiddleware from "../../../middleware/authMiddleware.js";

import {

    tenantMiddleware,

} from "../../../middleware/tenantMiddleware.js";

import {

    roleMiddleware,

} from "../../../middleware/roleMiddleware.js";

import{
getDashboardCounters,
getAdmissionTrend,
getPromotionTrend,
getTransferTrend,
getRecentActivities,
getLifecycleDistribution,
getGenderDistribution,
getClassWiseStudents,
getRevenue,
getDashboard

}from
"../controllers/dashboardController.js";

const router =
    express.Router();

router.get(

    "/counters",

    authMiddleware,

    roleMiddleware(

        "SuperAdmin",

        "SchoolAdmin"

    ),

    tenantMiddleware,

    getDashboardCounters

);

router.get(

    "/admissions",

    authMiddleware,

    roleMiddleware(

        "SuperAdmin",

        "SchoolAdmin"

    ),

    tenantMiddleware,

    getAdmissionTrend

);
router.get(

"/promotions",

authMiddleware,

roleMiddleware(

"SuperAdmin",

"SchoolAdmin"

),

tenantMiddleware,

getPromotionTrend

);

router.get(

"/transfers",

authMiddleware,

roleMiddleware(

"SuperAdmin",

"SchoolAdmin"

),

tenantMiddleware,

getTransferTrend

);

router.get(

"/recent",

authMiddleware,

roleMiddleware(

"SuperAdmin",

"SchoolAdmin"

),

tenantMiddleware,

getRecentActivities

);
router.get(
"/lifecycle",
authMiddleware,
roleMiddleware(
"SuperAdmin",
"SchoolAdmin"
),
tenantMiddleware,
getLifecycleDistribution
);

router.get(
"/gender",
authMiddleware,
roleMiddleware(
"SuperAdmin",
"SchoolAdmin"
),
tenantMiddleware,
getGenderDistribution
);

router.get(
"/class-wise",
authMiddleware,
roleMiddleware(
"SuperAdmin",
"SchoolAdmin"
),
tenantMiddleware,
getClassWiseStudents
);

router.get(
"/revenue",
authMiddleware,
roleMiddleware(
"SuperAdmin",
"SchoolAdmin"
),
tenantMiddleware,
getRevenue
);
router.get(
    "/",
    authMiddleware,
    tenantMiddleware,
    getDashboard
);

export default router;