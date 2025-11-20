import { useState } from "react";
import { createCircle } from "../api/circles";

export default function CircleForm() {
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await createCircle(name);
    setName("");
    alert("Circle created!");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow rounded-lg max-w-lg"
    >
      <h2 className="text-xl font-bold mb-4">Create New Circle</h2>

      <input
        type="text"
        placeholder="Study Circle Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2 w-full mb-4"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Create
      </button>
    </form>
  );
}
