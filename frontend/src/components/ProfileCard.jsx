import LogoutButton from "./LogoutButton";

function ProfileCard({ setToken }) {
  const username = localStorage.getItem("username"); 
  const userId = localStorage.getItem("userID");

  if (!userId) return null;
  return (
    <div style={{
      padding: "10px",
      background: "#5d76a7ff",
      borderRadius: "6px"
    }}>
      Logged in as: <strong>{username}</strong>
      <div style={{ padding: '4px'}}>
        <LogoutButton setToken={setToken}/>
      </div>
    </div>
  );
}

export default ProfileCard;