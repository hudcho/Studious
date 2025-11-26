import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#040454d4",
      }}
    >
      <h1
        style={{
          fontFamily: "Arial, sans-serif",
          marginBottom: "40px",
          color: "#fff",
        }}
      >
        Studious
      </h1>

      <button
        onClick={() => navigate("/login")}
        style={{
          padding: "15px 30px",
          marginBottom: "20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#748591ff",
          color: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        Login
      </button>

      <button
        onClick={() => navigate("/signup")}
        style={{
          padding: "15px 30px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#748591ff",
          color: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        Sign Up
      </button>
    </div>
  );
}
