import React, { useState } from "react";
import Sidebar from "./components/Sidebar"; // Optional, adjust/remove
import RoadmapForm from "./components/RoadmapForm";
import RoadmapResult from "./components/RoadmapResult";

function App() {
  const [studentData, setStudentData] = useState(null);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
            🚀 Get Your Personalized Roadmap 🎯
          </span>
        </h1>
        <div className="flex justify-center">
          <RoadmapForm onSubmit={setStudentData} />
        </div>
        {studentData && <RoadmapResult studentData={studentData} />}
      </main>
    </div>
  );
}

export default App;
