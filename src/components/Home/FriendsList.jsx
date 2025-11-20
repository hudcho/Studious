import { useEffect, useState } from "react";
import { fetchFriends } from "../api/friends";

export default function FriendsList() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends().then(setFriends);
  }, []);

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Your Friends</h2>
      <ul className="list-disc pl-6">
        {friends.map((f) => (
          <li key={f.id}>Friend ID: {f.friend_id}</li>
        ))}
      </ul>
    </div>
  );
}
