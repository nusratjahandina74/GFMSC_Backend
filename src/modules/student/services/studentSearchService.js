import Student from "../models/Student.js";

export const studentSearchService = async (
    query,
    schoolId
) => {

    const {

        page = 1,

        limit = 10,

        search,

        classId,

        sectionId,

        sessionId,

        guardianId,

        admissionStatus,

        lifecycleStatus,

        sortBy = "createdAt",

        order = "desc",

    } = query;

    const filter = {

        schoolId,

        isDeleted: false,

    };

    if (guardianId)
        filter.guardianId = guardianId;

    if (admissionStatus)
        filter.admissionStatus =
            admissionStatus;

    if (lifecycleStatus)
        filter.lifecycleStatus =
            lifecycleStatus;

    if (classId)
        filter.currentClassId =
            classId;

    if (sectionId)
        filter.currentSectionId =
            sectionId;

    if (sessionId)
        filter.currentAcademicSessionId =
            sessionId;

    if (search) {

        filter.$or = [

            {
                fullName: {
                    $regex: search,
                    $options: "i",
                },
            },

            {
                phone: {
                    $regex: search,
                    $options: "i",
                },
            },

            {
                birthCertificateNo: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                schoolStudentId: {
                    $regex: search,
                    $options: "i"
                }
            },

        ];

    }

    const total =
        await Student.countDocuments(
            filter
        );

    const students =
        await Student.find(filter)

            .populate(
                "guardianId",
                "fullName phone"
            )

            .populate(
                "currentClassId",
                "name"
            )

            .populate(
                "currentSectionId",
                "name"
            )

            .populate(
                "currentAcademicSessionId",
                "name"
            )

            .sort({
                [sortBy]:
                    order === "asc"
                        ? 1
                        : -1,
            })

            .skip(
                (page - 1) * limit
            )

            .limit(Number(limit));

    return {

        total,

        page:
            Number(page),

        pages:
            Math.ceil(
                total / limit
            ),

        students,

    };

};