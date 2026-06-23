import {

    auditQuerySchema,

} from "../validations/auditValidation.js";

import {

    getAuditLogsService,

} from "../services/getAuditLogsService.js";

export const getAuditLogs = async (

    req,

    res

) => {

    try {

        const result =

            auditQuerySchema.safeParse(

                req.query

            );

        if (!result.success) {

            return res.status(400).json({

                success: false,

                message:

                    result.error.errors[0]

                        .message,

            });

        }

        const data =

            await getAuditLogsService(

                result.data,

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