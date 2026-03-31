import Student from "../models/student.model.js";
import bcrypt from "bcrypt"

const addStudent = async(req, res) => {
    try{
        console.log(req.body);
        const password = await bcrypt.hash(req.body.password, 7);

        const newStudent = await Student.create({...req.body, password});
        res.status(201).json({
            message: "Student created successfully",
            data: newStudent,
        })
    }   
    catch(error){
        res.status(400).json({
            message: "Invalid student data",
            error: error.message,
        })
    }
}

const getAllStudent = async(req, res) => {
    try{
        const students = await Student.find();

        res.status(200).json({
            message: "All studnets fetched and retured",
            data: students,
        });
    }
    catch(error){
        res.status(500).json({
            message: "Iternal server error",
            error: error.message,
        })
    }
}

const updateStudent = async(req, res) => {
    try{
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id);

        res.status(204).json({
            message: "Student updated successfully",
            data: updatedStudent
        })
    }
    catch(err){
        res.statas(500).json({
            message: "Internal server error failed to update student",
            error: err.message,
        })
    }
}


const deleteStudent = async(req, res) => {
    try{
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);

        res.status(204).json({
            message: "Student deleted Successfully",
            data: deletedStudent,
        })
    }   
    catch(err){
        res.statas(500).json({
            message: "Internal server error failed to delte student",
            error: err.message,
        })
    }
}

export {getAllStudent ,addStudent, updateStudent, deleteStudent};    