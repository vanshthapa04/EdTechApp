import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ strict: true }));
app.use(bodyParser.json());


app.get("/api/test-roadmap", (req, res) => {
  res.json({
    weeks: [
      {
        title: "Test Week 1",
        days: [
          { day: "Monday", tasks: ["Task 1", "Task 2"] },
          { day: "Tuesday", tasks: ["Task 3"] },
        ],
      },
    ],
  });
});


async function callGeminiWithRetry(data, retries = 3, delay = 1000) {
  try {
    return await axios.post(geminiApiUrl, data, { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    if ((err.response?.status === 503 || err.code === 'ECONNRESET') && retries > 0) {
      await new Promise(res => setTimeout(res, delay));
      return callGeminiWithRetry(data, retries - 1, delay * 2);
    }
    throw err;
  }
}


app.post("/api/generate-roadmap", async (req, res) => {
    console.log("Request received:", req.body);
    function calculateWeeksBetweenDates(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.ceil(diffDays / 7)); // At least 1 week
}

  try {
  const { studentData } = req.body;

if (!studentData) {
  return res.status(400).json({ error: "Missing studentData in request body" });
}
if (!studentData.startDate || !studentData.endDate) {
  return res.status(400).json({ error: "Missing startDate or endDate in studentData" });
}

const startDate = studentData.startDate;
const endDate = studentData.endDate;

// Continue with calculateWeeksBetweenDates and prompt creation...


    const numberOfWeeks = calculateWeeksBetweenDates(startDate, endDate);

    const promptText = `
You are an AI that generates a detailed learning roadmap.
Output MUST be valid JSON with this structure:

Here's an example of a week-wise roadmap—each week is a single structured object with arrays of key learnings, problems, videos, and resources for that week:

{
  "weeks": [
    {
      "title": "Week 1: Data Structures Basics",
      "topics": ["Arrays", "Linked Lists", "Strings"],
      "concepts": [
        "Time/Space Complexity",
        "Array manipulation",
        "Linked list basics",
        "String operations"
      ],
      "problems": [
        {"name": "Two Sum", "url": "https://leetcode.com/problems/two-sum/"},
        {"name": "Reverse Linked List", "url": "https://leetcode.com/problems/reverse-linked-list/"}
      ],
      "youtubeLinks": [
        {"title": "Arrays and Linked Lists", "url": "https://youtube.com/example1"},
        {"title": "String Manipulation", "url": "https://youtube.com/example2"}
      ],
      "books": ["Introduction to Algorithms"],
      "websites": ["LeetCode", "GeeksforGeeks"],
      "projects": ["Basic CRUD using arrays/lists"],
      "notes": "Focus on writing efficient code and understanding basic patterns."
    },
    {
      "title": "Week 2: Advanced Structures & Patterns",
      "...": "..."
    }
    // additional weeks ...
  ]
  // possibly include recommended resources, tips, etc.
}

Generate a detailed ${numberOfWeeks}-week roadmap for this student:
${JSON.stringify(studentData)}

Output only the JSON object — no extra text.
Do not return empty weeks or empty arrays.
`;



    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    // Use flash model endpoint
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: promptText }
            ]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    console.dir(response.data, { depth: null });
    // Also log the extracted content string
    
    const candidates = response.data?.candidates;
    if (!candidates || !Array.isArray(candidates) || !candidates.length) {
        throw new Error("No candidates returned by Gemini, or returned array is empty.");
    }
    
    const parts = candidates[0]?.content?.parts;
    if (!parts || !Array.isArray(parts) || !parts.length) {
        throw new Error("No parts in Gemini response. See console for full response.");
    }
    console.log("Raw model output:", parts[0].text);

    let content = parts[0].text;
    content = content.trim();

    // Strip triple backticks and optional language tags
   if (content.startsWith('```')) {
  // Escape backticks inside string literal
  const endIdx = content.lastIndexOf('\\`\\`\\`');
  if (endIdx > 3) {
    content = content.substring(3, endIdx).trim();
    if (content.toLowerCase().startsWith('json')) {
      content = content.substring(4).trim();
    }
  }
}

    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found in Gemini response");

    const roadmap = JSON.parse(match[0]);
    res.json(roadmap);

} catch (err) {
  console.error("Full error object:", err);
  if (err.response?.data) console.error("Response data:", err.response.data);
  const message = err.response?.data?.error || err.message || "Unknown server error";
  res.status(err.response?.status || 500).json({ error: message });
}


});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
