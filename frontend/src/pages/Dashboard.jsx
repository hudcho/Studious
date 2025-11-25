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
import NewMessageForm from "../components/NewMessageForm";

function Dashboard({setToken}) {
    const currentUserID = Number(localStorage.getItem("userID"));
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [showNewMessageForm, setShowNewMessageForm] = useState(false);



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
    const handleSendNewMessage = async (username, message) => {
        try {
            const res = await fetch('http://localhost:3000/messages/direct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ recipientUsername: username, content: message }),
            });

            const data = await res.json();

            if (res.ok) {
            // Optionally: refresh conversations to include the new DM
            const updatedConversations = await fetch('http://localhost:3000/conversations', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }).then(r => r.json());
            setConversations(Array.isArray(updatedConversations) ? updatedConversations : []);
            
            // Optionally select the new conversation
            const newConv = updatedConversations.find(
                c => c.type === 'dm' && c.otherUserID === data.recipientID
            );

            if (newConv) setSelectedConversation(newConv);

            setShowNewMessageForm(false); // Close the form
            } else {
            console.error(data);
            }
        } catch (err) {
            console.error(err);
    }
    };

    return (
    <div style={{ display: "flex" }}>
        <Sidebar
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
            onNewMessage={() => setShowNewMessageForm(true)}
        />
    {showNewMessageForm && (
        <NewMessageForm 
            onSend={handleSendNewMessage} 
            onClose={() => setShowNewMessageForm(false)} 
        />
    )}
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
                    width: '260px',
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