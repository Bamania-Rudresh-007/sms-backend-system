import { useEffect, useEffectEvent, useState } from "react";
import API from "../api/api.js"

export default function useStudentServices() {

    // handles the storing and updating part of new students in local storage
    const [students , setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async() => {
            try {
                const data = await API.get("/students");
                console.log(data.data.data);
                setStudents(data.data.data || []);
            } catch (error) {
                console.error("Failed to fetch students: ", error);
                return [];
            }
        }

        fetchStudents()
    }, [])

    // Unique id generator
    const UniqueIdGenerator = () => {
        let newStudentId;
        const lastUpdatedId = JSON.parse(localStorage.getItem("lastUpdatedId"))
        if(lastUpdatedId){
            newStudentId = lastUpdatedId + 1;
        }
        else{
            newStudentId = students.length + 1001;
        }

        return newStudentId;
    }

    // For addStudent component...
    const addStudent = (currentStudent) => {
        try {
            // const updatedStudent = [...students, currentStudent];
            // setStudents(updatedStudent)
            console.log(currentStudent);
            API.post("/students", currentStudent)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        } catch (error) {
            console.error("Failed to store the current student data in local storage...", error);
            return [];
        }
    };

    // Handles the logic for updating students data
    const updateStudent = async(updatedStudent) => {
        // setStudents((prev) => prev.map(item => item.id == updatedStudent.id ? updatedStudent: item))
        console.log(updatedStudent)

        const res = await API.patch(`/students/${updatedStudent._id}`, updatedStudent)
        console.log(res)           

    };

    const deleteStudent = (data) => {
        if(students.length < 0){
            return false;
        }
        else{
            if(data.confirm.toLowerCase() == "delete"){
            data.id ? setStudents((prev) => prev.filter((item) => item.id != data.id)) : alert("Please give the valid Student ID");
            console.log(data)
            }
            else{
                alert("Confim through writing delete in below given form...");
            }
        }

    };
    

    return { addStudent, updateStudent, deleteStudent, UniqueIdGenerator, students, setStudents };
}
