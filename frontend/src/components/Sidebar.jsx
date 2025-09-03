import React from "react";
import { Book } from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 bg-white/10 backdrop-blur-lg shadow-2xl flex flex-col p-6 rounded-r-2xl">
      <h2 className="text-2xl font-bold mb-6 tracking-wide">📚 KnowledgeHub</h2>

      <nav className="flex flex-col space-y-4">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-pink-500/50 transform transition">
          <Book size={20} /> Road Map
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
