const BASE_URL = "http://localhost:3000";

export async function getFriends(user_id = 1) {
  const res = await fetch(`${BASE_URL}/friends/${user_id}`);
  return res.json();
}

