/* 
AUTHOR: Hudson Cho
CREATED: 11.22.2025
UPDATED: 11.23.2025
DESCRIPTION:
    Chat component that renders MessageBox and MessageInput as one unit.
*/
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
