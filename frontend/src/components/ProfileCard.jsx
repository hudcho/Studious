function ProfileCard() {
  const username = localStorage.getItem("username"); 
  const userId = localStorage.getItem("userID");

  if (!userId) return null;
  return (
    <div style={{
      padding: "10px",
      background: "#79a3f8ff",
      borderRadius: "6px"
    }}>
      Logged in as: <strong>{username}</strong>
      <br></br>
      UserID: <strong>{userId}</strong>
    </div>
  );
}

export default ProfileCard;