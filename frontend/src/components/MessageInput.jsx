/* 
AUTHOR: Hudson Cho
CREATED: 11.22.2025
UPDATED: 11.23.2025
DESCRIPTION:
    MessageInput component to render a text box and send button. Content typed into the 
    text box are send to a socket.io connection as a message object with required fields
*/

import React, { useState } from "react";

import { socket } from "../socket";

export default function MessageInput({ currentUserID, recipientID, circleID }) {
  const [content, setContent] = useState("");

  const handleSend = () => {
    // return if message is empty
    if (!content.trim()) return;

    // create message object with required database fields
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
