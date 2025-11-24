/* 
AUTHOR: Hudson Cho
CREATED: 11.22.2025
UPDATED: 11.23.2025
DESCRIPTION:
    Dashboard page that renders a users direct messages as well
    as any circles they are a part of.
*/
import Chat from "../components/Chat";
import LogoutButton from "../components/LogoutButton";
import MessagesBox from "../components/MessageBox";
import ProfileCard from "../components/ProfileCard";

function Dashboard({setToken}) {
    const currentUserID = Number(localStorage.getItem("userID"));
    const recipientID = 1;
    const circleID = null;
    return (
    <div>
        <LogoutButton setToken={setToken}/>
        <Chat
        currentUserID={currentUserID}
        recipientID={recipientID}
        circleID={circleID}
        />
    </div>
  );
}

export default Dashboard;