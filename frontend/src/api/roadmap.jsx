export async function getRoadmap(studentData) {
  console.log("Calling API with studentData:", studentData);

const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate-roadmap`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({studentData}),
});

if (!response.ok) {
  const errorText = await response.text();
  throw new Error(`API error: ${response.status} ${errorText}`);
}

const data = await response.json();
console.log("Roadmap data from backend:", data);

if (!data || !Array.isArray(data.weeks)) {
  throw new Error("Invalid roadmap format received");
}

return data;

}
