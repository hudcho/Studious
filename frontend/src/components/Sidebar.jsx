import React from "react";
import ProfileCard from "./ProfileCard";

export default function Sidebar({ conversations, selectedConversation, onSelectConversation, onNewMessage, circles, onCreateCircle }) {
   return (
    <div
      style={{
        width: "300px",
        borderRight: "1px solid #000000ff",
        height: "100%",
        overflowY: "auto",
        backgroundColor: "#d6d6d6",
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
      }}
    >
      {/* Conversation list */}
      {conversations.map((conv) => {
        const isSelected =
          conv.conversationid === selectedConversation?.conversationid;
        return (
          <div
            key={conv.conversationid}
            onClick={() => onSelectConversation(conv)}
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: isSelected ? "#979797ff" : "transparent",
              borderBottom: "1px solid #eee",
              transition: "background-color 0.2s",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{conv.name}</div>
            {conv.type === "dm" && (
              <div style={{ fontSize: "0.85em", color: "#555" }}>
                {conv.lastmessage || "No messages yet"}
              </div>
            )}
          </div>
        );
      })}

      {/* Buttons */}
      <div style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
        <button
          onClick={onNewMessage}
          style={{ width: "100%", padding: "8px", cursor: "pointer" }}
        >
          + New Message
        </button>
      </div>
      <div style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
        <button
          onClick={onCreateCircle}
          style={{ width: "100%", padding: "8px", cursor: "pointer" }}
        >
          + Create Circle
        </button>
      </div>
    </div>
  );
}