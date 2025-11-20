const BASE_URL = "http://localhost:3000";

export async function getCircleMembers(circle_id) {
  const res = await fetch(`${BASE_URL}/circle-members/${circle_id}`);
  return res.json();
}

export async function addCircleMember(circle_id, user_id) {
  const res = await fetch(`${BASE_URL}/circle-members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ circle_id, user_id }),
  });
  return res.json();
}
