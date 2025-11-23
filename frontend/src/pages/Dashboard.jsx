import LogoutButton from "../components/LogoutButton";
import ProfileCard from "../components/ProfileCard";

function Dashboard({setToken}) {
  return (
    <div>
        <ProfileCard/>
        <LogoutButton setToken={setToken}/>
    </div>
  );
}

export default Dashboard;