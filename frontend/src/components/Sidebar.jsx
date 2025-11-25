import React from "react";

export default function Sidebar({ conversations, selectedConversation, onSelectConversation }) {
  return (
    <div style={{
      width: "300px",
      borderRight: "1px solid #ccc",
      height: "100vh",
      overflowY: "auto",
      backgroundColor: "#fff",
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 1,
    }}>
      {conversations.map((conv) => {
        const isSelected = conv.conversationid === selectedConversation?.conversationid;
        return (
          <div
            key={conv.conversationid}
            onClick={() => onSelectConversation(conv)}
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: isSelected ? "#e0e0e0" : "transparent",
              borderBottom: "1px solid #eee",
              transition: "background-color 0.2s"
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {conv.type === "dm" ? conv.name : conv.name} {/* Circle or DM name */}
            </div>
            {conv.type === "dm" && (
              <div style={{ fontSize: "0.85em", color: "#555" }}>
                {conv.lastmessage || "No messages yet"}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}