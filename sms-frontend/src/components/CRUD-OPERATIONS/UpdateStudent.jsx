import {  useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import useStudentServices from "../../hooks/useCrudOperations.js";

function UpdateStudent() {
    const [updatedStudent , setUpdatedStudent] = useState({
        id: "",
        name: "",
        email: "",
        number: "",
        rollNumber: "",
        course: "",
        address: "",
    });

    const navigate = useNavigate()
    const { updateStudent } = useStudentServices()

    const isDark = JSON.parse(localStorage.getItem("Theme")) === "Dark Mode";

    useEffect(() => {
        setUpdatedStudent({
        id: "",
        name: "",
        email: "",
        number: "",
        rollNumber: "",
        course: "",
        address: "",
    })
        const isDirectedFromViewDetails = JSON.parse(localStorage.getItem("IsDirectedFromViewDetailsPage"));
        if(isDirectedFromViewDetails){
            handleAutoFocus();
            localStorage.setItem("IsDirectedFromViewDetailsPage", JSON.stringify(false));
        }
    } , [])

    // handles the changes of input elements and store in state
    const handleChange = (e) => {
        const {id, value} = e.target;
        setUpdatedStudent((prev) => ({...prev, [id]: value}));
    }


    const handleAutoFocus = () => {
        const rawNotMe = localStorage.getItem("EditFocusField");
        if (!rawNotMe) return;

        const notMe = JSON.parse(rawNotMe); 
        const currentStudent = JSON.parse(localStorage.getItem("CurrentViewDetails"));

        const { [notMe]: removed, ...rest } = currentStudent;

        setUpdatedStudent(rest);
        console.log("Key removed:", notMe, "Remaining:", rest);
    };

    const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition ${isDark ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900"}`;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-10 transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      
      <div className={`w-full max-w-3xl shadow-2xl rounded-3xl p-8 md:p-12 transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`}>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-medium transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
        
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 pt-5">
            Update Student
          </h2>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Modify the student details below.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">

          {/* Student ID */}
          <div>
            <label className={`block font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Student ID
            </label>
            <input
              type="text"
              placeholder="Enter student ID"
              id='id'
              value={updatedStudent._id}
              onChange={(e) => handleChange(e)}
              className={inputClass}
            />
          </div>

          {/* Full Name */}
          <div>
            <label className={`block font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Full Name
            </label>
            <input
              type="text"
              id='name'
              value={updatedStudent.name ?? ""}
              onChange={(e) => handleChange(e)}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className={`block font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Email Address
            </label>
            <input
              type="email"
              id='email'
              value={updatedStudent.email ?? ""}
              onChange={(e) => handleChange(e)}
              className={inputClass}
            />
          </div>

          {/* Phone + Roll No */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Phone Number
              </label>
              <input
                type="text"
                id='number'
                value={updatedStudent.number ?? ""}
                onChange={(e) => handleChange(e)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={`block font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Roll Number
              </label>
              <input
                type="text"
                id='rollNumber'
                value={updatedStudent.rollNumber ?? ""}
                onChange={(e) => handleChange(e)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Course */}
          <div>
            <label className={`block font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Course
            </label>
            <select
              onChange={(e) => handleChange(e)}
              id='course'
              value={updatedStudent.course ?? ""}
              className={inputClass}
            >
              <option>All</option>   
              <option>Diploma in Computer Engineering</option>
              <option>Diploma in Information Technology</option>
              <option>Diploma in Mechanical Engineering</option>
              <option>Diploma in Electrical Engineering</option>
              <option>Diploma in Civil Engineering</option>
              <option>Diploma in Electronics & Communication</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className={`block font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Address
            </label>
            <textarea
              rows="3"
              id='address'
              value={updatedStudent.address ?? ""}
              onChange={(e) => handleChange(e)}
              className={inputClass}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition shadow-md cursor-pointer"
              onClick={(e) => {
                if(updatedStudent.id != "" && updatedStudent.name != "" && updatedStudent.email != "" && updatedStudent.number != "" && updatedStudent.rollNumber != "" && updatedStudent.course != "" && updatedStudent.address != ""){
                    e.preventDefault()
                    console.log(updatedStudent)
                    updateStudent(updatedStudent);
                    setUpdatedStudent({
                        id: "",
                        name: "",
                        email: "",
                        number: "",
                        rollNumber: "",
                        course: "",
                        address: "",
                    })
                }
                else{
                    alert("Please Fill the Form Correctly!!!");
                }
              }}
            >
              Update Student
            </button>

            <button
              type="button"
              className={`flex-1 py-3 rounded-xl font-semibold transition cursor-pointer ${isDark ? "bg-gray-600 text-gray-200 hover:bg-gray-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

export default UpdateStudent;