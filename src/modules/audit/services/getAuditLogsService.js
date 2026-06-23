import AuditLog from "../models/AuditLog.js";

export const getAuditLogsService = async (

    query,

    schoolId

) => {

    const {

        page = 1,

        limit = 20,

        action,

        module,

        userId,

        startDate,

        endDate,

    } = query;

    const filter = {

        schoolId,

    };

    if (action)

        filter.action = action;

    if (module)

        filter.module = module;

    if (userId)

        filter.userId = userId;

    if (startDate || endDate) {

        filter.createdAt = {};

        if (startDate)

            filter.createdAt.$gte =

                new Date(startDate);

        if (endDate)

            filter.createdAt.$lte =

                new Date(endDate);

    }

    const total =

        await AuditLog.countDocuments(

            filter

        );

    const logs =

        await AuditLog.find(filter)

            .populate(

                "userId",

                "fullName email role"

            )

            .sort({

                createdAt: -1,

            })

            .skip(

                (page - 1) * limit

            )

            .limit(

                Number(limit)

            );

    return {

        total,

        page: Number(page),

        totalPages: Math.ceil(

            total / limit

        ),

        logs,

    };

};