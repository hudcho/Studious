import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/Home";
import SignupPage from "./pages/SignupPage";

function App() {
  const [token, setToken] = React.useState(localStorage.getItem("token"));


  return (
  <Router>
<Routes>
        {/* Home page with Login/Signup buttons */}
        <Route path="/" element={<HomePage />} />

        {/* Route to login page */}
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <LoginPage />}
        />

        {/* Route to signup page */}
        <Route
          path="/signup"
          element={token ? <Navigate to="/dashboard" /> : <SignupPage />}
        />

        {/* Route to dashboard */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/login" />}
        />

        {/* Catch-all redirects unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  </Router>
  )
}

export default App;