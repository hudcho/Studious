/* 
AUTHOR: Hudson Cho
CREATED: 11.20.2025
UPDATED: 11.20.2025
DESCRIPTION:
    LoginPage page: allows for users to enter a username and password to login
*/
import React from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignUpForm";

export default function SignupPage() {
  const navigate = useNavigate(); // <-- you were missing this

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#748591ff",
          color: "#fff",
        }}
      >
        ← Back
      </button>

      <SignupForm />
    </div>
  );
}
