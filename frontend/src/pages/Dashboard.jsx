/* 
AUTHOR: Hudson Cho
CREATED: 11.22.2025
UPDATED: 11.23.2025
DESCRIPTION:
    Dashboard page that renders a users direct messages as well
    as any circles they are a part of.
*/
import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import LogoutButton from "../components/LogoutButton";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";

function Dashboard({setToken}) {
    const currentUserID = Number(localStorage.getItem("userID"));
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    useEffect(() => {
        async function fetchConversations() {
            const res = await fetch(`http://localhost:3000/conversations`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                });
            const data = await res.json();
            console.log('fuck you: ', data);
            setConversations(Array.isArray(data) ? data : []);
            setConversations(data);
            if (data.length > 0) setSelectedConversation(data[0]);
        }
        fetchConversations();
    }, []);

    return (
    <div style={{ display: "flex" }}>
        <Sidebar
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
        />
        <div style={{ position: "relative" }}>
            <div
                style= {{ 
                    position: 'fixed',
                    bottom: '100px',
                    left: '500px',
                    zIndex: '9999'
            }}>
            <Chat
            currentUserID={currentUserID}
            recipientID={selectedConversation?.type === "dm" ? selectedConversation.otheruserid : null}
            circleID={selectedConversation?.type === "circle" ? selectedConversation.conversationid : null}
            />
            </div>

            {/* Position in bottom right corner */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    zIndex: '9999'
                }}>
                <ProfileCard/>
                <LogoutButton setToken={setToken}/>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;