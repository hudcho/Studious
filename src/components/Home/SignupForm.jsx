import { useState } from "react";
import { signup } from "../api/auth";

export default function SignupForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setMessage("Please fill out all fields.");
      return;
    }

    try {
      const data = await signup(form);
      setMessage(data.message); // success message from backend
      setForm({ firstName: "", lastName: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Doe"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter a strong password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-green-700 font-medium">{message}</p>
      )}
    </div>
  );
}
