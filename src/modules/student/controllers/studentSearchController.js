import {
    studentSearchService,
} from "../services/studentSearchService.js";

export const searchStudents =
async (
    req,
    res
) => {

try{

const data=
await studentSearchService(

req.query,

req.schoolId

);

return res.json({

success:true,

data

});

}

catch(error){

return res.status(500).json({

success:false,

message:error.message

});

}

};