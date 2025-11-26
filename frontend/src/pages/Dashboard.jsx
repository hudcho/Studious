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
import CreateCircleForm from "../components/CreateCircleForm";

function Dashboard({setToken}) {
    const currentUserID = Number(localStorage.getItem("userID"));
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [showNewMessageForm, setShowNewMessageForm] = useState(false);
    const [showCreateCircleForm, setShowCreateCircleForm] = useState(false);


    useEffect(() => {
        async function fetchConversations() {
            const res = await fetch(`http://localhost:3000/conversations`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                });
            const data = await res.json();
            setConversations(Array.isArray(data) ? data : []);
            if (data.length > 0) setSelectedConversation(data[0]);
        }
        fetchConversations();
    }, []);


const [circles, setCircles] = useState([]);

useEffect(() => {
  const fetchCircles = async () => {
    try {
      const response = await fetch("/api/circles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setCircles(data);
    } catch (err) {
      console.error("Error fetching circles:", err);
    }
  };

  fetchCircles();
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
        } 
        catch (err) {
            console.error(err);
        }
    };

const handleCreateCircle = async ({ name, members }) => {
  try {
    const res = await fetch("http://localhost:3000/circles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, members }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Circle creation error:", data);
      return;
    }

    // refresh circles
    const updatedCircles = await fetch("http://localhost:3000/circles", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(r => r.json());
    setCircles(updatedCircles);

    // 🔥 refresh conversations
    const updatedConversations = await fetch("http://localhost:3000/conversations", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(r => r.json());
    setConversations(updatedConversations);

    // optionally auto-select the new circle:
    const newCircleConv = updatedConversations.find(c => c.type === "circle" && c.name === name);
    if (newCircleConv) setSelectedConversation(newCircleConv);


    // Close the modal
    setShowCreateCircleForm(false);

  } catch (err) {
    console.error("error creating circle:", err);
  }
};




  return (
    <div style={{ display: "flex", height: '100vh', overflow: 'hidden', backgroundColor: '#040454d4' }}>
      <Sidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
        onNewMessage={() => setShowNewMessageForm(true)}
        circles={circles}
        onCreateCircle={() => setShowCreateCircleForm(true)}
      />
      {showNewMessageForm && (
        <NewMessageForm 
          onSend={handleSendNewMessage} 
          onClose={() => setShowNewMessageForm(false)} 
        />
      )}
      {showCreateCircleForm && (
        <CreateCircleForm
            onCreate={handleCreateCircle}
            onClose={() => setShowCreateCircleForm(false)}
        />
      )}


      <div
        style= {{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0
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
      <ProfileCard setToken={setToken}/>
    </div>

  </div>
  );
}

export default Dashboard;