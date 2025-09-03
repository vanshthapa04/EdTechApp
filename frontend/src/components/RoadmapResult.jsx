import React, { useState, useEffect } from "react";
import { getRoadmap } from "../api/roadmap.jsx";
import RoadmapTable from "./RoadmapTable";

function RoadmapResult({ studentData }) {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!studentData) return;

    setLoading(true);
    setError("");
    setRoadmap(null);

    getRoadmap(studentData)
      .then(data => setRoadmap(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [studentData]);

 if (loading)
  return (
    <div className="flex items-center justify-center mt-8 space-x-3">
      <svg
        className="animate-spin h-8 w-8 text-pink-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="text-pink-400 text-lg font-semibold select-none">
        Generating your personalized roadmap...
      </span>
    </div>
  );


  if (error) {
    return (
      <div style={{ whiteSpace: "pre-wrap", color: "red", marginTop: 20 }}>
        Error: {error}
      </div>
    );
  }

  if (!roadmap) return null;

  return (
    <>
      <RoadmapTable roadmap={roadmap} />
      {/* <RoadmapDisplay roadmap={roadmap} /> */}
    </>
  );
}

export default RoadmapResult;
