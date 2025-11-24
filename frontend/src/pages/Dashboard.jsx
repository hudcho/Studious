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
    const recipientID = null;
    const circleID = 4;
    return (
    <div style={{ position: "relative" }}>
        <LogoutButton setToken={setToken}/>

        <Chat
        currentUserID={currentUserID}
        recipientID={recipientID}
        circleID={circleID}
        />

        {/* Position in bottom right corner */}
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                zIndex: '9999'
            }}>
        <ProfileCard/>
        </div>
    </div>
  );
}

export default Dashboard;