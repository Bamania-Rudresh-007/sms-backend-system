import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

const signup = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: encryptedPassword
        })

        const token = jwt.sign(
            {userId: newUser._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.json({
            message: "User stored in database succesffully",
            data: newUser,
            token
        })

    } catch (error) {
        res.json({
            message: "failed sigining up",
            error: error.message,
        })
    }
}




export {signup}; 