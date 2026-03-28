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

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!password){
            return res.status(400).json({
                message: "Password is required"
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid token, access denied"
            })
        }

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET , {expiresIn: "1h"})

        res.json({
            message: "Login successfull",
            data: user,
            token
        })

    }   
    catch(error){
        res.status(500).json({
            message: "Internal Server error",
            error: error.message,
        });
    }
}



export {signup, login}; 