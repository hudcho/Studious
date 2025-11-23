function ProfileCard() {
  const user = localStorage.getItem("user"); 

  if (!user) return null;
  return (
    <div style={{
      padding: "10px",
      background: "#2b2d31",
      borderRadius: "6px"
    }}>
      <strong>{user.username}</strong>
    </div>
  );
}

export default ProfileCard;