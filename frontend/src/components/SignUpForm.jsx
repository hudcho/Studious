import { useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }
const loginRes = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      setError(loginData.error);
      return;
    }

      // Optionally log them in immediately after signup
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("username", loginData.username);
      localStorage.setItem("userID", loginData.id);

      window.location.href = "/dashboard"; // or useNavigate
    } catch (err) {
      setError("Error connecting to backend: " + err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#040454d4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "30px",
          border: "1px solid #000000ff",
          borderRadius: "8px",
          backgroundColor: "#748591ff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          minWidth: "300px",
        }}
      >
        <h1
          style={{
            fontFamily: "Arial, sans-serif",
            marginBottom: "20px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Studious
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "8px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "8px" }}
        />

        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
          Sign Up
        </button>

        {error && (
          <p style={{ color: "red", margin: 0, fontSize: "0.9em" }}>{error}</p>
        )}
      </form>
    </div>
  );
}
