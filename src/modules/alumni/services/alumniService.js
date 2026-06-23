import Student from "../../student/models/Student.js";

import { createAuditLog }
from "../../audit/services/auditService.js";

export const archiveStudentService =
async (
    payload,
    schoolId,
    userId
)=>{
    const student =
    await Student.findOne({
        _id:payload.studentId,
        schoolId,
        isDeleted:false,
    });

    if(!student){
        throw new Error("Student not found");
    }

    student.lifecycleStatus="Alumni";

    await student.save();

    await createAuditLog({

        schoolId,

        userId,

        action:"ARCHIVE_STUDENT",

        module:"Alumni",

        entityId:student._id,

    });

    return student;
};