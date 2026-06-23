import Student
  from "../../student/models/Student.js";

import Guardian
  from "../../guardian/models/Guardian.js";

import Class
  from "../../academic/class/models/Class.js";

import Section
  from "../../academic/section/models/Section.js";
export const
  getDashboardCountersService =
    async (schoolId) => {

      const [

        activeStudents,

        alumni,

        transferred,

        inactive,

        guardians,

        classes,

        sections,

      ] = await Promise.all([

        Student.countDocuments({

          schoolId,

          isDeleted: false,

          lifecycleStatus: "Active",

        }),

        Student.countDocuments({

          schoolId,

          isDeleted: false,

          lifecycleStatus: "Alumni",

        }),

        Student.countDocuments({

          schoolId,

          isDeleted: false,

          lifecycleStatus: "Transferred",

        }),

        Student.countDocuments({

          schoolId,

          isDeleted: false,

          lifecycleStatus: "Inactive",

        }),

        Guardian.countDocuments({

          schoolId,

          isDeleted: false,

        }),

        Class.countDocuments({

          schoolId,

          isDeleted: false,

        }),

        Section.countDocuments({

          schoolId,

          isDeleted: false,

        }),

      ]);

      return {

        activeStudents,

        alumni,

        transferred,

        inactive,

        teachers: 0,

        guardians,

        classes,

        sections,

      };

    };