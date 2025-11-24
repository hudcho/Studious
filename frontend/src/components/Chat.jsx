// Chat.jsx
import React from "react";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";

export default function Chat({ currentUserID, recipientID, circleID }) {
  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <MessageBox currentUserID={currentUserID} recipientID={recipientID} circleID={circleID} />
      <MessageInput currentUserID={currentUserID} recipientID={recipientID} circleID={circleID} />
    </div>
  );
}
