// MessageInput.jsx
import React, { useState } from "react";

import { socket } from "../socket";

export default function MessageInput({ currentUserID, recipientID, circleID }) {
  const [content, setContent] = useState("");

  const handleSend = () => {
    if (!content.trim()) return;

    const message = {
      senderID: currentUserID,
      content,
      recipientID: recipientID || null,
      circleID: circleID || null
    };

    socket.emit("sendMessage", message);
    setContent(""); // clear input
  };

  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ flex: 1, padding: "8px" }}
        placeholder="Type a message..."
      />
      <button onClick={handleSend} style={{ padding: "8px 12px" }}>
        Send
      </button>
    </div>
  );
}
