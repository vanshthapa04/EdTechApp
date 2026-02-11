# 🎓 EdTechApp

An ed-tech project with a React (Vite) frontend and Node.js/Express backend.

---

## 🚀 Project Structure

EdTechApp/
│── backend/ # Node.js + Express API
│── frontend/ # React + Vite frontend

yaml
Copy code

---

## 🔧 Running Locally

### 1. Backend
```bash
cd backend
npm install
npm start
Backend runs on: http://localhost:3001

2. Frontend
bash
Copy code
cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173

🔐 Environment Variables
Create .env files in the following locations:

Backend (backend/.env)
ini
Copy code
PORT=3001
OPENAI_API_KEY=your_openai_key
GOOGLE_API_KEY=your_google_key
Frontend (frontend/.env)
ini
Copy code
VITE_BACKEND_URL=http://localhost:3001
⚠️ Do not commit these files. They are ignored by .gitignore.

🌍 Deployment
Backend → Render (Node.js service)

Frontend → Vercel (Vite React app)

Set the environment variables directly in the hosting platform dashboards.

yaml
Copy code

---

## 3️⃣ First Git Commit & Push

Run these commands from the **root** of your project:

```bash
git init
git add .
git commit -m "Initial commit: project setup with frontend & backend"
git branch -M main
git remote add origin https://github.com/vanshthapa04/EdTechApp
git push -u origin main