import Student from "../models/Student.js";

import { createAuditLog }
from "../../audit/services/auditService.js";

export const recoverStudentService =
async (
    payload,
    schoolId,
    userId
) => {

    const student =
    await Student.findOne({

        _id: payload.studentId,

        schoolId,

        isDeleted: true,

    });

    if (!student) {

        throw new Error(
            "Deleted student not found"
        );

    }

    student.isDeleted = false;

    student.deletedAt = null;

    student.deletedBy = null;

    await student.save();

    await createAuditLog({

        schoolId,

        userId,

        action:
            "RECOVER_STUDENT",

        module:
            "Student",

        entityId:
            student._id,

    });

    return student;

};