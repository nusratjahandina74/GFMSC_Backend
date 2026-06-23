import Student from "../../student/models/Student.js";

import Class from "../../academic/class/models/Class.js";

import StudentAcademicHistory from "../../studentAcademicHistory/models/StudentAcademicHistory.js";

export const promoteStudentService =
    async (
        payload,
        schoolId
    ) => {
        const student =
            await Student.findOne({
                _id: payload.studentId,
                schoolId,
                isDeleted: false,
            });

        if (!student) {
            throw new Error(
                "Student not found"
            );
        }

        const targetClass =
            await Class.findOne({
                _id: payload.newClassId,
                schoolId,
                isDeleted: false,
            });

        if (!targetClass) {
            throw new Error(
                "Target class not found"
            );
        }

        const studentCount =
            await Student.countDocuments({
                currentClassId:
                    payload.newClassId,

                currentSectionId:
                    payload.newSectionId,

                isDeleted: false,
            });

        if (
            studentCount >=
            targetClass.capacity
        ) {
            throw new Error(
                "Class capacity exceeded"
            );
        }

        const newRoll =
            studentCount + 1;

        await StudentAcademicHistory.updateMany(
            {
                studentId:
                    student._id,

                status: "Active",
            },
            {
                status: "Promoted",
            }
        );

        const history =
            await StudentAcademicHistory.create(
                {
                    schoolId,

                    studentId:
                        student._id,

                    academicSessionId:
                        payload.newAcademicSessionId,

                    classId:
                        payload.newClassId,

                    sectionId:
                        payload.newSectionId,

                    rollNumber:
                        newRoll,

                    status: "Active",

                    remarks:
                        "Student promoted",
                }
            );

        student.currentAcademicSessionId =
            payload.newAcademicSessionId;

        student.currentClassId =
            payload.newClassId;

        student.currentSectionId =
            payload.newSectionId;

        student.currentRollNumber =
            newRoll;

        await student.save();
        await createAuditLog({
            schoolId,

            userId,

            action:
                "PROMOTE_STUDENT",

            module:
                "Promotion",

            entityId:
                student._id,

            oldData: {
                classId:
                    oldClassId,

                sectionId:
                    oldSectionId,
            },

            newData: {
                classId:
                    payload.newClassId,

                sectionId:
                    payload.newSectionId,
            },
        });
        return {
            student,
            history,
        };
    };
