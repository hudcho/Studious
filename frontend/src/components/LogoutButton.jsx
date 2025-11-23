import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton({ setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);           // <-- updates App state
    navigate("/login");       // optional, re-navigates
  };

  return (
    <button onClick={handleLogout} style={{ padding: "8px 12px", cursor: "pointer" }}>
      Logout
    </button>
  );
}

export default LogoutButton;