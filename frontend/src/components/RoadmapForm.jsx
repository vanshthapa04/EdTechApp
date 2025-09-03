import React, { useState, useEffect } from "react";
import Select from "react-select";

function RoadmapForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // form states
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [endGoal, setEndGoal] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [year, setYear] = useState("");
  const [learningSpeed, setLearningSpeed] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Format date as yyyy-mm-dd
  const formatDate = (date) => date.toISOString().split("T")[0];

  // set default dates
  useEffect(() => {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);
    setStartDate(formatDate(today));
    setEndDate(formatDate(nextMonth));
  }, []);

  // Tech options for react-select
  const techOptions = [
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "C#", label: "C#" },
    { value: "Node.js", label: "Node.js" },
    { value: "React.js", label: "React.js" },
    { value: "Ruby", label: "Ruby" },
    { value: "PHP", label: "PHP" },
    { value: "Swift", label: "Swift" },
    { value: "Kotlin", label: "Kotlin" },
  ];

 async function handleSubmit(e) {
  e.preventDefault();

  const payload = {
    studentName: "Krish",
    knownTech: selectedTechs,
    endGoal,
    year,
    learningSpeed,
    difficulty,
    startDate,
    endDate,
  };

  setStudentName(payload.studentName);  // <-- set immediately here
  setLoading(true);
  setError(null);
  setResult(null);

  onSubmit(payload);

  try {
    const requestBody = { studentData: payload };

    const r = await fetch("http://localhost:3001/api/generate-roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!r.ok) {
      const errData = await r.json().catch(() => ({}));
      setError(errData.error || `Error ${r.status}: ${r.statusText}`);
      return;
    }

    const roadmapData = await r.json();
    setResult(roadmapData);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-6 border border-white/20 animate-fadeIn"
      >
        {/* Tech Stacks */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Tech Stacks You Already Know
          </label>
          <Select
            isMulti
            name="techs"
            options={techOptions}
            value={techOptions.filter((opt) =>
              selectedTechs.includes(opt.value)
            )}
            onChange={(options) =>
              setSelectedTechs(options ? options.map((opt) => opt.value) : [])
            }
            className="w-full react-select-container"
            classNamePrefix="react-select"
            styles={{
              control: (base, state) => ({
                ...base,
                background: "#232B3E",
                color: "#fff",
                borderColor: state.isFocused ? "#a7b9ee" : "#64748b",
                minHeight: "48px",
                borderRadius: "0.75rem",
                fontSize: "1.1rem",
                boxShadow: state.isFocused ? "0 0 0 2px #f472b6" : "none",
                padding: "0.25rem 0.5rem",
              }),
              placeholder: (base) => ({
                ...base,
                color: "white",
                opacity: 1,
                filter: "none",
              }),
              input: (base) => ({
                ...base,
                color: "#fff",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#fff",
              }),
              multiValue: (base) => ({
                ...base,
                background: "#ef4444",
                color: "#fff",
                borderRadius: "0.50rem",
                fontWeight: "600",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: "#fff",
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: "#fff",
                ":hover": {
                  backgroundColor: "#c026d3",
                  color: "#fff",
                },
              }),
              menu: (base) => ({
                ...base,
                background: "#232B3E",
                color: "#fff",
                borderRadius: "0.75rem",
              }),
              option: (base, { isFocused, isSelected }) => ({
                ...base,
                backgroundColor: isFocused
                  ? "#c026d3"
                  : isSelected
                  ? "#ef4444"
                  : "#232B3E",
                color: "#fff",
                cursor: "pointer",
                fontWeight: isSelected ? "bold" : "normal",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "#a3a3a3",
              }),
              clearIndicator: (base) => ({
                ...base,
                color: "#a3a3a3",
              }),
            }}
            placeholder="Choose tech stacks"
          />
        </div>

       {/* End Goal */}
<div>
  <label className="block text-lg font-semibold mb-2">
    What is your End Goal?
  </label>
  <Select
    isMulti
    name="endGoals"
    options={techOptions} // Or make a new options array if different goals needed
    value={techOptions.filter((opt) => endGoal.includes(opt.value))}
    onChange={(options) =>
      setEndGoal(options ? options.map((opt) => opt.value) : [])
    }
    className="w-full react-select-container"
    classNamePrefix="react-select"
    styles={{
      control: (base, state) => ({
        ...base,
        background: "#232B3E",
        color: "#fff",
        borderColor: state.isFocused ? "#a7b9ee" : "#64748b",
        minHeight: "48px",
        borderRadius: "0.75rem",
        fontSize: "1.1rem",
        boxShadow: state.isFocused ? "0 0 0 2px #f472b6" : "none",
        padding: "0.25rem 0.5rem",
      }),
      placeholder: (base) => ({
        ...base,
        color: "white",
        opacity: 1,
        filter: "none",
      }),
      input: (base) => ({
        ...base,
        color: "#fff",
      }),
      singleValue: (base) => ({
        ...base,
        color: "#fff",
      }),
      multiValue: (base) => ({
        ...base,
        background: "#ef4444",
        color: "#fff",
        borderRadius: "0.50rem",
        fontWeight: "600",
      }),
      multiValueLabel: (base) => ({
        ...base,
        color: "#fff",
      }),
      multiValueRemove: (base) => ({
        ...base,
        color: "#fff",
        ":hover": {
          backgroundColor: "#c026d3",
          color: "#fff",
        },
      }),
      menu: (base) => ({
        ...base,
        background: "#232B3E",
        color: "#fff",
        borderRadius: "0.75rem",
      }),
      option: (base, { isFocused, isSelected }) => ({
        ...base,
        backgroundColor: isFocused
          ? "#c026d3"
          : isSelected
          ? "#ef4444"
          : "#232B3E",
        color: "#fff",
        cursor: "pointer",
        fontWeight: isSelected ? "bold" : "normal",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        color: "#a3a3a3",
      }),
      clearIndicator: (base) => ({
        ...base,
        color: "#a3a3a3",
      }),
    }}
    placeholder="Choose end goals"
  />
</div>


        {/* Year */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Which year you are in
          </label>
          <div className="flex gap-4 flex-wrap">
            {["1st year 🎉", "2nd year 😍", "3rd year 🤓", "4th year 🎓"].map(
              (y, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full cursor-pointer hover:bg-pink-500 hover:scale-105 transition"
                >
                  <input
                    type="radio"
                    name="year"
                    value={y}
                    checked={year === y}
                    onChange={(e) => setYear(e.target.value)}
                    className="accent-pink-500"
                  />{" "}
                  {y}
                </label>
              )
            )}
          </div>
        </div>

        {/* Learning Speed */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Learning Speed
          </label>
          <div className="flex gap-4 flex-wrap">
            {["Fast learner 🚀", "Medium learner 🏄", "Slow learner 🐢"].map(
              (speed, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full cursor-pointer hover:bg-purple-500 hover:scale-105 transition"
                >
                  <input
                    type="radio"
                    name="speed"
                    value={speed}
                    checked={learningSpeed === speed}
                    onChange={(e) => setLearningSpeed(e.target.value)}
                    className="accent-purple-500"
                  />{" "}
                  {speed}
                </label>
              )
            )}
          </div>
        </div>

        {/* Level */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            At what level do you want to learn?
          </label>
          <div className="flex gap-4 flex-wrap">
            {["Beginner 😀", "Intermediate 🙂", "Advanced 😎"].map(
              (lvl, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full cursor-pointer hover:bg-yellow-500 hover:scale-105 transition"
                >
                  <input
                    type="radio"
                    name="level"
                    value={lvl}
                    checked={difficulty === lvl}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="accent-yellow-500"
                  />{" "}
                  {lvl}
                </label>
              )
            )}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Select a Date Range
          </label>
          <div className="flex gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 shadow-inner focus:ring-2 focus:ring-green-500 transition"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 shadow-inner focus:ring-2 focus:ring-green-500 transition"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-lg font-bold rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 shadow-xl hover:scale-105 hover:shadow-yellow-500/50 active:scale-95 transform transition"
        >
          {loading ? "Generating..." : "Submit 🚀"}
        </button>
      </form>

     {/* Result */}
<div className="mt-8">
  {error && (
    <p>{typeof error === "string" ? error : JSON.stringify(error)}</p>
  )}
  {result && (
    <>
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-8"
      >
        <span
          className="
            inline-block
            px-10
            py-4
            rounded-xl
            bg-gradient-to-r from-[#F472B6]/70 via-[#A78BFA]/70 to-[#38BDF8]/70
            text-white
            shadow-lg
            border border-white/10
            backdrop-blur
            tracking-tight
          "
          style={{
            boxShadow: "0 4px 24px 0 rgba(55, 48, 163, 0.10)",
          }}
        >
          Personalized Roadmap for{" "}
          <span className="font-extrabold text-white drop-shadow-none">
            {studentName}
          </span>
        </span>
      </h2>
      {/* Your roadmap rendering below */}
    </>
  )}
</div>
</div>
);
}

export default RoadmapForm;

