import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        number: {
            type: Number,
            required: true,
            
        },
        rollNumber: {
            type: Number,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    }
)

const Student = mongoose.model("Student", studentSchema);

export default Student;