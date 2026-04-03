import { useNavigate } from "react-router-dom";
import { useStudents } from "../../contexts/StudentsContext.jsx"; 
import { useState, useRef, useEffect } from "react";


function ViewStudentDetails() {
    const navigate = useNavigate();
    const { deletedStudent, setDeletedStudent } = useStudents()
    const [showFieldMenu, setShowFieldMenu] = useState(false);
    const menuRef = useRef(null);

    const isDark = JSON.parse(localStorage.getItem("Theme")) === "Dark Mode";
    
    const currentStudent = JSON.parse(localStorage.getItem("CurrentViewDetails"));

    const fields = [
        { label: "Full Name", id: "name" },
        { label: "Email Address", id: "email" },
        { label: "Phone Number", id: "number" },
        { label: "Roll Number", id: "rollNumber" },
        { label: "Course", id: "course" },
        { label: "Address", id: "address" },
    ];

    // Close dropdown if user clicks outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowFieldMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleFieldSelect = (fieldId) => {
        localStorage.setItem("CurrentViewDetails", JSON.stringify(currentStudent));
        localStorage.setItem("EditFocusField", JSON.stringify(fieldId));
        localStorage.setItem("IsDirectedFromViewDetailsPage", JSON.stringify(true));
        navigate("/updateStudent");
    };

    const handleDeleteBtn = () => {
        navigate("/deleteStudent")
        console.log(currentStudent)
        setDeletedStudent({...deletedStudent, id: currentStudent._id})
    }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-10 transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>

      {/* Card Container */}
      <div className={`w-full max-w-3xl shadow-2xl rounded-3xl p-8 md:p-12 transition-colors duration-300 ${isDark ? "bg-gray-800" : "bg-white"}`}>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-500 hover:text-indigo-400 font-medium transition cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-500 pt-5">
            Student Details
          </h2>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Complete information about the student
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Name */}
          <div>
            <h4 className={`font-medium mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Full Name</h4>
            <p className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>{currentStudent.name}</p>
          </div>

          {/* Roll Number */}
          <div>
            <h4 className={`font-medium mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Roll Number</h4>
            <p className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>{currentStudent.rollNumber}</p>
          </div>

          {/* Unique ID */}
          <div>
            <h4 className={`font-medium mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Student ID</h4>
            <p className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>{currentStudent._id}</p>
          </div>

          {/* Email */}
          <div>
            <h4 className={`font-medium mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Email</h4>
            <p className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>{currentStudent.email}</p>
          </div>

          {/* Phone */}
          <div>
            <h4 className={`font-medium mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Phone</h4>
            <p className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>{currentStudent.number}</p>
          </div>

          {/* Course */}
          <div>
            <h4 className={`font-medium mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Course</h4>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${isDark ? "bg-indigo-900/50 text-indigo-300" : "bg-indigo-100 text-indigo-600"}`}>
              {currentStudent.course}
            </span>
          </div>

          {/* Status */}
          <div>
            <h4 className={`font-medium mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Status</h4>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600"}`}>
              Active
            </span>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <h4 className={`font-medium mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Address</h4>
            <p className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
              {currentStudent.address}
            </p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">

          {/* Edit Student Button with Click Dropdown */}
          <div className="flex-1 relative" ref={menuRef}>

            {/* Dropdown Field Menu - appears above button */}
            {showFieldMenu && (
              <div className={`absolute bottom-full mb-2 left-0 w-full border rounded-xl shadow-xl z-10 overflow-hidden ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}>
                <p className={`text-xs font-medium px-4 pt-3 pb-1 uppercase tracking-wide ${isDark ? "text-gray-400" : "text-gray-400"}`}>
                  Select field to edit
                </p>
                {fields.map((field) => (
                  <button
                    key={field.id}
                    onClick={() => handleFieldSelect(field.id)}
                    className={`w-full text-left px-4 py-2.5 font-medium transition text-sm flex items-center gap-2 ${isDark ? "text-gray-200 hover:bg-yellow-900/30 hover:text-yellow-400" : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-700"}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
                    {field.label}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowFieldMenu((prev) => !prev)}
              className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              Edit Student
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-200 ${showFieldMenu ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <button
            className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition shadow-md cursor-pointer"
            onClick={handleDeleteBtn}
          >
            Delete Student
          </button>
        </div>

      </div>
    </div>
  );
}

export default ViewStudentDetails;