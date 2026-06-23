import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
    {
        schoolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School",
            required: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        birthCertificateNo: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        guardianId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Guardian",
        },
        currentAcademicSessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicSession",
        },
        currentClassId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
        },
        currentSectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        },
        currentRollNumber: {
            type: Number,
        },
        schoolStudentId: {
            type: String,
            unique: true,
            trim: true,
        },
        admissionStatus: {
            type: String,
            enum: [
                "Pending",
                "Approved",
                "Waitlist",
            ],
            default: "Approved",
        },
        lifecycleStatus: {
            type: String,
            enum: [
                "Active",
                "Transferred",
                "Graduated",
                "Alumni",
                "Inactive",
            ],
            default: "Active",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },

        deletedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);
studentSchema.index({
    schoolId: 1,
    fullName: "text",
    phone: "text",
    birthCertificateNo: "text",
    schoolStudentId: "text"
});

studentSchema.index({
    currentClassId: 1,
    currentSectionId: 1,
});

studentSchema.index({
    guardianId: 1,
});

studentSchema.index({
    lifecycleStatus: 1,
});

studentSchema.index({
    admissionStatus: 1,
});

studentSchema.index({
    schoolId: 1,
    lifecycleStatus: 1,
});

studentSchema.index({
    schoolId: 1,
    currentClassId: 1,
});

studentSchema.index({
    schoolId: 1,
    gender: 1,
});

studentSchema.index({
    schoolId: 1,
    admissionStatus: 1,
});
studentSchema.index({
    schoolId: 1,
    lifecycleStatus: 1,
    currentClassId: 1,
});
studentSchema.index({
    schoolId: 1,
    admissionStatus: 1,
    gender: 1,
});
const Student = mongoose.model(
    "Student",
    studentSchema
);

export default Student;