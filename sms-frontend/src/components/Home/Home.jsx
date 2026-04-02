import { useNavigate, Link } from 'react-router-dom';
import { useUsers } from "../../contexts/UsersContext.jsx"
import { useState, useEffect } from 'react';

function Home() {
    const navigate = useNavigate();
    const {setIsLogin, loginUser} =  useUsers();
    
    const [currentTheme, setCurrentTheme] = useState(() => {
        try {
            const theme = JSON.parse(localStorage.getItem("Theme"));
            return  theme ? theme : "Light Mode";
        } catch (error) {
            console.error("Failed to fetch theme from local storage", error);
        }
    })

    useEffect(() => {
        if(currentTheme == "Dark Mode"){
            localStorage.setItem("Theme", JSON.stringify("Dark Mode"));
        }
        else{
            localStorage.setItem("Theme", JSON.stringify("Light Mode"));
        }
    }, [currentTheme])
    

  // handles the logOut button
  const handleLogout = () => {
      setIsLogin(() => {
          localStorage.setItem("isLogin", JSON.stringify(false));
          localStorage.removeItem("sms-token");
      })
    navigate("/");
    window.location.reload();
  }

  const handleThemeBtn = () => {
    setCurrentTheme(prev => prev === "Dark Mode" ? "Light Mode" : "Dark Mode");     
  }

  const isDark = currentTheme === "Dark Mode";

  // who is currently loged in so we can display there detials in profile section
    const currentLogedInUser = JSON.parse(localStorage.getItem("currentLogInUser"));


  return (
  <div className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"}`}>

    {/* Sidebar */}
    <aside className={`w-full lg:w-80 text-white flex lg:flex-col flex-row justify-between items-center lg:items-start p-4 lg:p-8 shadow-2xl lg:min-h-screen transition-colors duration-300 ${isDark ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" : "bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800"}`}>

      <div className="w-full">
        <h1 className="text-xl lg:text-3xl font-bold mb-4 lg:mb-12 text-center lg:text-left tracking-tight">
          Student Dashboard
        </h1>

        {/* Profile Section */}
        <div className={`backdrop-blur-sm p-4 lg:p-6 rounded-3xl shadow-xl border flex lg:flex-col items-center lg:items-center gap-4 lg:gap-0 transition-colors duration-300 ${isDark ? "bg-white/5 border-white/10" : "bg-white/10 border-white/20"}`}>

          <div className={`w-16 h-16 lg:w-24 lg:h-24 rounded-full flex items-center justify-center text-2xl lg:text-4xl font-bold shadow-lg ring-4 flex-shrink-0 transition-colors duration-300 ${isDark ? "bg-gray-300 text-gray-800 ring-white/20" : "bg-white text-indigo-700 ring-white/30"}`}>
            {currentLogedInUser?.name?.charAt(0)}
          </div>

          <div className="text-center lg:mt-5 flex-1 lg:flex-none">
            <h2 className="text-base lg:text-xl font-bold">
              {currentLogedInUser?.name}
            </h2>

            <p className="text-xs lg:text-sm text-indigo-100 mt-2 break-all px-2">
              {currentLogedInUser?.email}
            </p>

            <p className="text-xs lg:text-sm mt-3 bg-green-400 text-green-900 py-1.5 px-4 rounded-full inline-block font-semibold shadow-md">
              ● Logged In
            </p>
          </div>

          {/* Logout button on mobile - inside card */}
          <button 
            className={`lg:hidden px-4 py-2 rounded-xl font-bold active:scale-95 transition-all shadow-lg text-sm whitespace-nowrap flex-shrink-0 cursor-pointer ${isDark ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-white text-indigo-700 hover:bg-indigo-50"}`}
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>

      {/* Logout button on desktop - below card */}
      <button 
        className={`hidden lg:block px-6 py-3 rounded-xl font-bold active:scale-95 transition-all shadow-lg text-base mt-8 w-full cursor-pointer duration-200 ${isDark ? "bg-gray-600 text-white hover:bg-gray-500 hover:shadow-xl" : "bg-white text-indigo-700 hover:bg-indigo-50 hover:shadow-xl hover:text-xl hover:scale-100"}`}
        onClick={handleLogout}
      >
        Logout
      </button>

    </aside>


    {/* Main */}
    <div className="flex-1 flex flex-col">

      {/* Welcome */}
      <header className={`shadow-sm px-4 lg:px-10 py-5 lg:py-8 border-b flex justify-between items-center gap-4 transition-colors duration-300 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="min-w-0">
            <h2 className={`text-2xl lg:text-4xl font-bold tracking-tight truncate ${isDark ? "text-white" : "text-gray-900"}`}>
            Welcome Back {currentLogedInUser.name.split(" ")[0]}👋
            </h2>
            <p className={`mt-2 text-sm lg:text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage your students efficiently using the options below.
            </p>
        </div>

        <div className="flex-shrink-0">
            <button
            onClick={handleThemeBtn}
            className={`flex items-center gap-2 px-3 py-2 lg:px-5 lg:py-2.5 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 active:scale-95 sm:mr-3.5 cursor-pointer shadow-md hover:shadow-lg border ${
                isDark
                ? "bg-gray-700 text-yellow-300 border-gray-600 hover:bg-gray-600 hover:text-yellow-200"
                : "bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-700"
            }`}
            >
            {/* Icon */}
            <span className="text-base lg:text-lg">
                {isDark ? "☀️" : "🌙"}
            </span>
            {/* Label - hidden on very small screens */}
            <span className="hidden sm:inline">
                {isDark ? "Light Mode" : "Dark Mode"}
            </span>
            </button>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-10">

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">

          <div className={`p-6 lg:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border hover:-translate-y-1 ${isDark ? "bg-gray-800 border-gray-700 hover:border-indigo-500" : "bg-white border-gray-100 hover:border-indigo-200"}`}>
            <h3 className={`text-xs lg:text-sm font-semibold uppercase tracking-wide ${isDark ? "text-gray-400" : "text-gray-500"}`}>Your Role</h3>
            <p className="text-2xl lg:text-3xl font-bold text-indigo-500 mt-3">
              Admin
            </p>
          </div>

          <div className={`p-6 lg:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border hover:-translate-y-1 ${isDark ? "bg-gray-800 border-gray-700 hover:border-green-500" : "bg-white border-gray-100 hover:border-green-200"}`}>
            <h3 className={`text-xs lg:text-sm font-semibold uppercase tracking-wide ${isDark ? "text-gray-400" : "text-gray-500"}`}>Account Status</h3>
            <p className="text-2xl lg:text-3xl font-bold text-green-500 mt-3">
              Active
            </p>
          </div>

          <div className={`p-6 lg:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border hover:-translate-y-1 sm:col-span-2 lg:col-span-1 ${isDark ? "bg-gray-800 border-gray-700 hover:border-blue-500" : "bg-white border-gray-100 hover:border-blue-200"}`}>
            <h3 className={`text-xs lg:text-sm font-semibold uppercase tracking-wide ${isDark ? "text-gray-400" : "text-gray-500"}`}>System Access</h3>
            <p className="text-2xl lg:text-3xl font-bold text-blue-500 mt-3">
              Full Access
            </p>
          </div>

        </div>

        {/* CRUD Section */}
        <div>
          <h3 className={`text-xl lg:text-3xl font-bold mb-6 lg:mb-8 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Student Management
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

            <Link to={"/addStudent"}>
              <div className={`p-6 lg:p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border group ${isDark ? "bg-gray-800 border-gray-700 hover:border-indigo-500" : "bg-white border-gray-100 hover:border-indigo-300"}`}>
                <div className="w-14 h-14 lg:w-16 lg:h-16 mb-4 lg:mb-5 text-indigo-600 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  ➕
                </div>
                <h4 className={`text-lg lg:text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Add Student
                </h4>
                <p className={`text-sm lg:text-base leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Register a new student into the system.
                </p>
              </div>
            </Link>

            <Link to={"/viewStudents"}>
              <div className={`p-6 lg:p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border group ${isDark ? "bg-gray-800 border-gray-700 hover:border-green-500" : "bg-white border-gray-100 hover:border-green-300"}`}>
                <div className="w-14 h-14 lg:w-16 lg:h-16 mb-4 lg:mb-5 text-green-600 bg-green-50 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  📋
                </div>
                <h4 className={`text-lg lg:text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  View Students
                </h4>
                <p className={`text-sm lg:text-base leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Browse and search all student records.
                </p>
              </div>
            </Link>

            <Link to={"/updateStudent"}>
              <div className={`p-6 lg:p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border group ${isDark ? "bg-gray-800 border-gray-700 hover:border-yellow-500" : "bg-white border-gray-100 hover:border-yellow-300"}`}>
                <div className="w-14 h-14 lg:w-16 lg:h-16 mb-4 lg:mb-5 text-yellow-600 bg-yellow-50 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  ✏️
                </div>
                <h4 className={`text-lg lg:text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Update Student
                </h4>
                <p className={`text-sm lg:text-base leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Modify student information easily.
                </p>
              </div>
            </Link>

            <Link to={"/deleteStudent"}>
              <div className={`p-6 lg:p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border group ${isDark ? "bg-gray-800 border-gray-700 hover:border-red-500" : "bg-white border-gray-100 hover:border-red-300"}`}>
                <div className="w-14 h-14 lg:w-16 lg:h-16 mb-4 lg:mb-5 text-red-600 bg-red-50 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  ❌
                </div>
                <h4 className={`text-lg lg:text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Delete Student
                </h4>
                <p className={`text-sm lg:text-base leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Remove student records permanently.
                </p>
              </div>
            </Link>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className={`text-center py-5 lg:py-6 text-xs lg:text-sm shadow-inner border-t transition-colors duration-300 ${isDark ? "bg-gray-800 text-gray-500 border-gray-700" : "bg-white text-gray-500 border-gray-200"}`}>
        © {new Date().getFullYear()} Student Management System. All rights reserved.
      </footer>

    </div>

  </div>
);

}

export default Home;