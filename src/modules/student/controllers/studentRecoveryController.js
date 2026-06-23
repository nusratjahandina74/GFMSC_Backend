import {
    recoverStudentSchema,
} from "../validations/studentRecoveryValidation.js";

import {
    recoverStudentService,
} from "../services/studentRecoveryService.js";

export const recoverStudent =
async (
    req,
    res
) => {

try{

const result =
recoverStudentSchema.safeParse(
req.body
);

if(!result.success){

return res.status(400).json({

success:false,

message:
result.error.errors[0].message,

});

}

const student =
await recoverStudentService(

result.data,

req.schoolId,

req.user._id

);

return res.status(200).json({

success:true,

message:
"Student recovered successfully",

data:student

});

}

catch(error){

return res.status(500).json({

success:false,

message:error.message

});

}

};