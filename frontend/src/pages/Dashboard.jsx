import ProfileCard from "../components/ProfileCard";

function Dashboard() {
  return (
    <div className="dashboard-container" style={{ display: "flex", height: "100vh" }}>
      <ProfileCard/>
      <div style={{ flex: 1, background: "#f1f3f5" }}>
        {/* Chat panel goes here later */}
        <h1>Welcome to your dashboard!</h1>
      </div>
    </div>
  );
}

export default Dashboard;