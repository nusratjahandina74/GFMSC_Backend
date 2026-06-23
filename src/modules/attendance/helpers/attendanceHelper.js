const VALID_STATUS = [

    "Present",

    "Absent",

    "Late",

    "Leave",

];

export const normalizeAttendanceDate =
(date)=>{

    const d =
    new Date(date);

    d.setHours(
        0,
        0,
        0,
        0
    );

    return d;

};

export const isValidAttendanceStatus =
(status)=>{

    return VALID_STATUS.includes(
        status
    );

};

export const buildDuplicateFilter =
({

    schoolId,

    studentId,

    attendanceDate,

})=>({

    schoolId,

    studentId,

    attendanceDate:
    normalizeAttendanceDate(
        attendanceDate
    ),

});

export const buildPagination = (

    query

) => {

    return {

        page:

            Number(query.page) || 1,

        limit:

            Number(query.limit) || 20,

    };

};

export const buildAttendanceFilter = (

    query

) => {

    const filter = {

        isDeleted: false,

    };

    if (query.schoolId)

        filter.schoolId =
            query.schoolId;

    if (query.studentId)

        filter.studentId =
            query.studentId;

    if (query.status)

        filter.status =
            query.status;

    if (query.attendanceSessionId)

        filter.attendanceSessionId =
            query.attendanceSessionId;

    if (query.attendanceDate) {

        filter.attendanceDate =
            normalizeAttendanceDate(

                query.attendanceDate

            );

    }

    return filter;

};