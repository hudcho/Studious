// ../api/circleMembers.js

export async function fetchCircleMembers(circleId) {
  const res = await fetch(`/api/circles/${circleId}/members`);
  if (!res.ok) throw new Error("Failed to fetch circle members");
  return res.json();
}

export async function addCircleMember(circleId, user_id) {
  const res = await fetch(`/api/circles/${circleId}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id }),
  });

  if (!res.ok) throw new Error("Failed to add member");
  return res.json();
}
