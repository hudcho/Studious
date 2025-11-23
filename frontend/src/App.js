import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = React.useState(localStorage.getItem("token"));


  return (
  <Router>
    <Routes>
      {/* Route to login page*/}
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" /> : <LoginPage />}
      />

      {/* Route to dashboard page*/}
      <Route
        path="/dashboard"
        element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/login" />}
      />

      {/* Defaults to login if no token or if unkown*/}
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
  )
}

export default App;