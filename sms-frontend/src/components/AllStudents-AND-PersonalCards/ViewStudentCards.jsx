import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStudentServices from "../../hooks/useCrudOperations.js";
import { data } from "../../dummyData/data.js";

function ViewStudentCards() {
  const { students } = useStudentServices();
  const navigate = useNavigate();
  const isDark = JSON.parse(localStorage.getItem("Theme")) === "Dark Mode";

  // ── Core state ────────────────────────────────────────────────────────────
  const [baseStudents, setBaseStudents]     = useState([]);   // source of truth for current dataset
  const [filterStudents, setFilterStudents] = useState([]);   // what's actually rendered

  // ── Modal state ───────────────────────────────────────────────────────────
  const [showModal, setShowModal]       = useState(false);
  const [modalSelected, setModalSelected] = useState("own");  // "own" | "random"
  const [dummyLimit, setDummyLimit]     = useState(20);
  const [modalError, setModalError]     = useState("");
  const MAX = 150;

  // ── On first load: show saved students immediately ────────────────────────
  useEffect(() => {
    setBaseStudents(students);
    setFilterStudents(students);
  }, [students]);  // re-sync if students array updates

  // ── Limit input handler ───────────────────────────────────────────────────
  function handleModalLimitChange(val) {
    const num = parseInt(val);
    if (!val)               { setDummyLimit(""); setModalError(""); return; }
    if (isNaN(num) || num < 1) { setModalError("Enter a number between 1 and 150."); return; }
    if (num > MAX)          { setDummyLimit(MAX); setModalError(`Max limit is ${MAX}.`); return; }
    setDummyLimit(num);
    setModalError("");
  }

  // ── Modal confirm: swap dataset ───────────────────────────────────────────
  function handleModalConfirm() {
    if (!modalSelected) { setModalError("Please choose a data source."); return; }
    if (modalSelected === "random") {
      const n = parseInt(dummyLimit);
      if (!n || n < 1 || n > MAX) { setModalError(`Enter a valid limit (1–${MAX}).`); return; }
    }

    if (modalSelected === "own") {
      localStorage.setItem("currentViewStudentsThrough", JSON.stringify("existingStudent"));
      setBaseStudents(students);
      setFilterStudents(students);
    } else {
      localStorage.setItem("currentViewStudentsThrough", JSON.stringify("Data"));
      const slice = data.slice(0, parseInt(dummyLimit));
      setBaseStudents(slice);
      setFilterStudents(slice);
    }

    setShowModal(false);
  }

  // ── Source selector dropdown ──────────────────────────────────────────────
  function handleSourceChange(e) {
    const val = e.target.value;
    if (val === "Dummy data") {
      setModalSelected("random");   // pre-select random in modal
      setShowModal(true);
    } else if (val === "Saved Users") {
      // Load saved students directly, no modal needed
      setBaseStudents(students);
      setFilterStudents(students);
      localStorage.setItem("currentViewStudentsThrough", JSON.stringify("existingStudent"));
    }
  }

  // ── Filter by course ──────────────────────────────────────────────────────
  function handleFilter(e) {
    const selectedCourse = e.target.value;
    if (selectedCourse === "All") {
      setFilterStudents(baseStudents);
      return;
    }
    setFilterStudents(baseStudents.filter((s) => s.course === selectedCourse));
  }

  // ── Search by name ────────────────────────────────────────────────────────
  function handleSearchByName(e) {
    const { value } = e.target;
    if (!value) {
      setFilterStudents(baseStudents);
      return;
    }
    setFilterStudents(
      baseStudents.filter((s) => s.name?.toLowerCase().includes(value.toLowerCase()))
    );
  }

  // ── Style helpers ─────────────────────────────────────────────────────────
  const cardBg   = isDark ? "bg-gray-800 border-gray-700"   : "bg-white border-gray-200";
  const titleCls = isDark ? "text-white"                    : "text-gray-800";
  const subCls   = isDark ? "text-gray-400"                 : "text-gray-500";

  // ── Option card (modal) ───────────────────────────────────────────────────
  function OptionCard({ icon, label, desc, active, onClick }) {
    const base  = "cursor-pointer flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-200 select-none";
    const theme = active
      ? "border-indigo-500 bg-indigo-500/10"
      : isDark
        ? "border-gray-700 hover:border-gray-500 bg-gray-700/40"
        : "border-gray-200 hover:border-indigo-200 bg-gray-50";
    return (
      <div
        className={`${base} ${theme}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
      >
        {/* Radio dot */}
        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
          ${active ? "border-indigo-500" : isDark ? "border-gray-600" : "border-gray-300"}`}>
          {active && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />}
        </div>
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl
          ${active
            ? isDark ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"
            : isDark ? "bg-gray-700 text-gray-400"     : "bg-gray-100 text-gray-500"}`}>
          {icon}
        </div>
        {/* Text */}
        <div className="flex flex-col min-w-0">
          <span className={`font-semibold text-sm ${active ? isDark ? "text-indigo-300" : "text-indigo-700" : titleCls}`}>{label}</span>
          <span className={`text-xs mt-0.5 ${subCls}`}>{desc}</span>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen p-6 md:p-10 transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>

      {/* ── Data Source Modal ──────────────────────────────────────────────── */}
      {showModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4
          ${isDark ? "bg-black/60" : "bg-gray-900/40"} backdrop-blur-sm`}>
          <div
            className={`w-full max-w-md rounded-2xl border shadow-2xl p-6 ${cardBg}`}
            style={{ boxShadow: isDark ? "0 0 60px rgba(99,102,241,0.15)" : "0 0 60px rgba(99,102,241,0.1)" }}
          >
            {/* Modal Header */}
            <div className="mb-6">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4
                ${isDark ? "bg-indigo-900 text-indigo-400" : "bg-indigo-100 text-indigo-600"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7h16M4 7l2-3h12l2 3M10 11v5M14 11v5" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold ${titleCls}`}>Choose Data Source</h3>
              <p className={`text-sm mt-1 ${subCls}`}>How would you like to populate the student directory?</p>
            </div>

            {/* Option Cards */}
            <div className="flex flex-col gap-3 mb-5">
              <OptionCard
                icon="📋"
                label="My Saved Data"
                desc="Load students you've already added manually."
                active={modalSelected === "own"}
                onClick={() => { setModalSelected("own"); setModalError(""); }}
              />
              <OptionCard
                icon="🎲"
                label="Random Demo Data"
                desc="Generate up to 150 sample students instantly."
                active={modalSelected === "random"}
                onClick={() => { setModalSelected("random"); setModalError(""); }}
              />
            </div>

            {/* Limit Panel — slides in when random is selected */}
            <div className={`overflow-hidden transition-all duration-300
              ${modalSelected === "random" ? "max-h-44 opacity-100 mb-5" : "max-h-0 opacity-0"}`}>
              <div className={`rounded-xl p-4 border
                ${isDark ? "bg-gray-700/50 border-gray-600" : "bg-indigo-50 border-indigo-100"}`}>
                <div className="flex items-center justify-between mb-2">
                  <label className={`text-xs font-semibold uppercase tracking-wide
                    ${isDark ? "text-gray-400" : "text-indigo-500"}`}>
                    Number of students
                  </label>
                  <span className={`text-sm font-bold tabular-nums ${isDark ? "text-indigo-300" : "text-indigo-700"}`}>
                    {dummyLimit || 0} / {MAX}
                  </span>
                </div>
                <input
                  type="range" min="1" max={MAX}
                  value={dummyLimit || 1}
                  onChange={(e) => handleModalLimitChange(e.target.value)}
                  className="w-full accent-indigo-500 mb-3 cursor-pointer"
                />
                <div className="flex gap-2 flex-wrap">
                  {[10, 25, 50, 100, 150].map((n) => (
                    <button
                      key={n}
                      onClick={() => handleModalLimitChange(String(n))}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition font-medium
                        ${dummyLimit === n
                          ? isDark ? "bg-indigo-600 border-indigo-600 text-white" : "bg-indigo-500 border-indigo-500 text-white"
                          : isDark ? "border-gray-600 text-gray-400 hover:border-indigo-500 hover:text-indigo-300" : "border-indigo-200 text-indigo-400 hover:bg-indigo-100"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Error */}
            {modalError && (
              <p className="text-xs text-red-400 mb-4 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {modalError}
              </p>
            )}

            {/* Action Row — Cancel + Confirm */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border cursor-pointer
                  ${isDark
                    ? "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-200"
                    : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"}`}
              >
                Cancel
              </button>
              <button
                onClick={handleModalConfirm}
                disabled={!modalSelected}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]
                  ${modalSelected
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-900/20 cursor-pointer"
                    : isDark ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
              >
                {modalSelected === "own"
                  ? "Load My Students →"
                  : modalSelected === "random"
                    ? `Load ${dummyLimit || 0} Students →`
                    : "Select a Source"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ── End Modal ──────────────────────────────────────────────────────── */}

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-indigo-500 hover:text-indigo-400 font-medium transition w-fit cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 gap-6">
        <div>
          <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>Student Directory</h2>
          <p className={`text-sm mt-1 ${subCls}`}>{filterStudents.length} student{filterStudents.length !== 1 ? "s" : ""} shown</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Data source selector */}
          <div className="flex flex-col gap-1">
            <label className={`font-medium text-xs uppercase tracking-wide ${isDark ? "text-gray-400" : "text-gray-500"}`}>Data Source</label>
            <select
              defaultValue=""
              className={`px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition cursor-pointer
                ${isDark ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-200 text-gray-600"}`}
              onChange={handleSourceChange}
            >
              <option value="" disabled>Choose source…</option>
              <option value="Saved Users">Saved Users</option>
              <option value="Dummy data">Dummy Data</option>
            </select>
          </div>

          {/* Course filter */}
          <div className="flex flex-col gap-1">
            <label className={`font-medium text-xs uppercase tracking-wide ${isDark ? "text-gray-400" : "text-gray-500"}`}>Filter by Course</label>
            <select
              className={`px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition cursor-pointer
                ${isDark ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-200 text-gray-600"}`}
              onChange={handleFilter}
            >
              <option>All</option>
              <option>Diploma in Computer Engineering</option>
              <option>Diploma in Information Technology</option>
              <option>Diploma in Mechanical Engineering</option>
              <option>Diploma in Electrical Engineering</option>
              <option>Diploma in Civil Engineering</option>
              <option>Diploma in Electronics &amp; Communication</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Search ─────────────────────────────────────────────────────────── */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className={`h-4 w-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search students by name…"
          className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
            ${isDark
              ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500"
              : "bg-white border-gray-200 text-gray-700 placeholder-gray-400"}`}
          onChange={handleSearchByName}
        />
      </div>

      {/* ── Cards Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filterStudents.length > 0 ? (
          filterStudents.map((student) => (
            <div
              key={student._id}
              className={`rounded-2xl shadow-sm border p-5 flex flex-col hover:shadow-md transition-all duration-200
                ${isDark
                  ? "bg-gray-800 border-gray-700 hover:border-indigo-500"
                  : "bg-white border-gray-100 hover:border-indigo-200 hover:shadow-indigo-50"}`}
            >
              {/* Avatar + Name + Course */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0
                  ${isDark ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-600"}`}>
                  {student.name?.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`font-semibold text-sm leading-tight truncate ${isDark ? "text-white" : "text-gray-800"}`}>
                    {student.name}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full mt-1 w-fit max-w-full truncate
                    ${isDark ? "text-indigo-300 bg-indigo-900/50" : "text-indigo-500 bg-indigo-50"}`}>
                    {student.course}
                  </span>
                </div>
              </div>

              <div className={`border-t mb-4 ${isDark ? "border-gray-700" : "border-gray-100"}`} />

              {/* Info */}
              <div className="flex flex-col gap-2 text-sm mb-5">
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-500" : "text-gray-400"}>Roll No</span>
                  <span className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>{student.rollNumber}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className={`flex-shrink-0 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Email</span>
                  <span className={`font-medium truncate ${isDark ? "text-gray-300" : "text-gray-600"}`} title={student.email}>
                    {student.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-500" : "text-gray-400"}>Student ID</span>
                  <span className={`font-medium truncate pl-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{student._id}</span>
                </div>
              </div>

              <div className="flex-grow" />

              <Link to="/viewStudentDetails">
                <button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
                  onClick={() => localStorage.setItem("CurrentViewDetails", JSON.stringify(student))}
                >
                  View Details
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-24 gap-3">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
              ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
              🎓
            </div>
            <p className={`text-base font-semibold ${isDark ? "text-gray-500" : "text-gray-400"}`}>No students found</p>
            <p className={`text-sm ${isDark ? "text-gray-600" : "text-gray-300"}`}>Try changing the filter or data source</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewStudentCards;