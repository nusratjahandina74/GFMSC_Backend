import mongoose from "mongoose";

const guardianSchema = new mongoose.Schema(
    {
        schoolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School",
            required: true,
            index: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
        },


        phone: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            default: "Parent",
        },

        occupation: {
            type: String,
            trim: true,
        },

        relation: {
            type: String,
            enum: [
                "Father",
                "Mother",
                "Guardian",
            ],
            required: true,
        },

        address: {
            type: String,
            trim: true,
        },

        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        ],

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Guardian = mongoose.model(
    "Guardian",
    guardianSchema
);

export default Guardian;