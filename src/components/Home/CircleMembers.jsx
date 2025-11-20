import { useEffect, useState } from "react";
import { fetchCircleMembers, addCircleMember } from "../api/circleMembers";

export default function CircleMembers({ circleId }) {
  const [members, setMembers] = useState([]);

  async function refresh() {
    setMembers(await fetchCircleMembers(circleId));
  }

  async function handleAdd() {
    const user_id = prompt("Enter User ID to add:");
    await addCircleMember(circleId, user_id);
    refresh();
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="ml-4 border-l pl-4">
      <button
        onClick={handleAdd}
        className="bg-indigo-600 text-white px-3 py-1 rounded mb-3"
      >
        + Add Member
      </button>

      <ul className="space-y-2">
        {members.map((m) => (
          <li
            key={m.id}
            className="p-2 bg-white border rounded shadow-sm"
          >
            👤 User {m.user_id}
          </li>
        ))}
      </ul>
    </div>
  );
}
