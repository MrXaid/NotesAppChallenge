import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, login } = useAuth();

  // 🚀 If already logged in → redirect to homepage
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", { username, password });
      // ✅ fetch real username from backend (cookie is now set)
      const res = await api.get("/auth/me");
      login(res.data.username);
      navigate("/notes");
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-parchment bg-cover bg-center px-6">
      <div className="max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-cinzel font-semibold text-wood mb-4 tracking-wide">
          🔑 Enter the <span className="text-gold">Archive</span>
        </h1>
        
        <p className="text-base text-gray-700 mb-8 leading-relaxed font-serif">
          Access your preserved thoughts and memories from ages past.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            className="border-2 border-gray-300 bg-white p-3 w-full rounded-lg shadow-sm font-serif focus:text-amber-900 focus:outline-none transition"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="border-2 border-gray-300 bg-white p-3 w-full rounded-lg shadow-sm font-serif focus:text-amber-900 focus:outline-none transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="bg-wood text-parchment px-5 py-2.5 rounded-lg font-cinzel text-base shadow-sm hover:scale-105 transition transform w-full"
          >
            🚪 Enter Archive
          </button>
        </form>

        <div className="mt-6">
          <p className="text-gray-600 font-serif">
            New to the archive?{" "}
            <a 
              href="/signup" 
              className="text-gold hover:underline font-cinzel"
            >
              Create account
            </a>
          </p>
        </div>

        {/* Decorative line */}
        <div className="mt-8 w-48 h-1 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
}