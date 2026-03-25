import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <h2>⛳ Golf Platform</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <Link to="/charity">Charity</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}

        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;