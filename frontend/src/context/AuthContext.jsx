import { createContext, useContext, useState, useEffect } from "react";
import { logoutUser } from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored && stored !== "undefined") {
      setUser(JSON.parse(stored));
    }
  }, []);

  const logout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("user");
      setUser(null);

      window.location.href = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);