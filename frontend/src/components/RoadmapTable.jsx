import React from "react";

function RoadmapTable({ roadmap }) {
  if (!roadmap || !roadmap.weeks || !Array.isArray(roadmap.weeks)) {
    return <p>No roadmap data available.</p>;
  }

  return (
    <div className="space-y-10">
      {roadmap.weeks.map((week, wIndex) => (
        <section
          key={wIndex}
          className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-purple-400 mb-6">{week.title}</h2>
          <ul className="text-gray-300 space-y-3 list-disc list-inside">
            {week.topics && week.topics.length > 0 && (
              <li>
                <strong>Topics:</strong> {week.topics.join(", ")}
              </li>
            )}
            {week.concepts && week.concepts.length > 0 && (
              <li>
                <strong>Concepts:</strong>
                <ul className="list-disc list-inside ml-5">
                  {week.concepts.map((concept, i) => (
                    <li key={i}>{concept}</li>
                  ))}
                </ul>
              </li>
            )}
            {week.problems && week.problems.length > 0 && (
              <li>
                <strong>LeetCode Problems:</strong>
                <ul className="list-disc list-inside ml-5">
                  {week.problems.map((problem, i) => (
                    <li key={i}>
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {problem.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {week.youtubeLinks && week.youtubeLinks.length > 0 && (
              <li>
                <strong>YouTube Links:</strong>
                <ul className="list-disc list-inside ml-5">
                  {week.youtubeLinks.map((yt, i) => (
                    <li key={i}>
                      <a
                        href={yt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {yt.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {week.books && week.books.length > 0 && (
              <li>
                <strong>Books:</strong> {week.books.join(", ")}
              </li>
            )}
            {week.websites && week.websites.length > 0 && (
              <li>
                <strong>Websites:</strong> {week.websites.join(", ")}
              </li>
            )}
            {week.projects && week.projects.length > 0 && (
              <li>
                <strong>Projects:</strong>
                <ul className="list-disc list-inside ml-5">
                  {week.projects.map((project, i) => (
                    <li key={i}>{project}</li>
                  ))}
                </ul>
              </li>
            )}
            {week.notes && (
              <li>
                <strong>Notes:</strong> <em>{week.notes}</em>
              </li>
            )}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default RoadmapTable;
