import LogoutButton from "../components/LogoutButton";
import MessagesBox from "../components/MessageBox";
import ProfileCard from "../components/ProfileCard";

function Dashboard({setToken}) {
  return (
    <div>
        <ProfileCard/>
        <LogoutButton setToken={setToken}/>
        <MessagesBox/>
    </div>
  );
}

export default Dashboard;