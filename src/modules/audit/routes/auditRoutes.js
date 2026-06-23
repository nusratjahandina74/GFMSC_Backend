import express from "express";

import {

    getAuditLogs,

} from "../controllers/auditController.js";

import authMiddleware from "../../../middleware/authMiddleware.js";

import {

    roleMiddleware,

} from "../../../middleware/roleMiddleware.js";

import {

    tenantMiddleware,

} from "../../../middleware/tenantMiddleware.js";

const router = express.Router();

router.get(

    "/",

    authMiddleware,

    roleMiddleware(

        "SuperAdmin",

        "SchoolAdmin"

    ),

    tenantMiddleware,

    getAuditLogs

);

export default router;