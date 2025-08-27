import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-[#3e2723] via-[#4e342e] to-[#3e2723] text-gold px-6 py-3 flex justify-between items-center shadow-2xl border-b-4 border-[#2c1810]">
      {/* ✅ Home link */}
      <div className="font-cinzel text-2xl tracking-wider">
        <Link to="/" className="hover:text-parchment transition">
          🪵 Notes of Antiquity
        </Link>
      </div>

      <div className="space-x-6 font-cinzel text-lg">
        {!user && (
          <>
            <Link to="/signup" className="hover:text-parchment transition">
              Signup
            </Link>
            <Link to="/login" className="hover:text-parchment transition">
              Login
            </Link>
          </>
        )}
        {user && (
          <>
            <Link to="/notes" className="hover:text-parchment transition">
              Notes
            </Link>
            <span className="ml-4">
              ⚔️ <strong>{user}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="ml-2 bg-gold text-wood px-4 py-1 rounded shadow-md hover:bg-parchment hover:text-wood transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
