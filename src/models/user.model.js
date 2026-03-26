import mongoose from "mongoose";

const userSchemna = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }
    },
    
    {timestamps: true}
)

const User = mongoose.model("SmsUser", userSchemna)

export default User;