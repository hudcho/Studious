
import React, { useEffect, useState, useRef } from "react";

import { socket } from "../socket";

export default function MessageBox({ currentUserID, recipientID, circleID }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Fetch existing messages on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let url = '';
        if (recipientID) {
          url = `http://localhost:3000/messages/direct?recipientID=${recipientID}`;
        } else if (circleID) {
          url = `http://localhost:3000/messages/circle/${circleID}`;
        }

        const res = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [recipientID, circleID]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      // Only add relevant messages
      console.log("new mesage: ", message);
      if (
        (recipientID && (
            message.senderID === recipientID || 
            message.recipientID === recipientID ||
            message.senderID === currentUserID
        )) ||
        (circleID && message.circleID === circleID) || 1 ===1 
          ) {
        setMessages((prev) => {
            console.log("updating message fuck you: ", [...prev, message]);
            return [...prev, message]});
      }
    });

    return () => socket.off("receiveMessage");
  }, [recipientID, circleID]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ height: "400px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
      {messages.map((msg) => (
        <div key={msg.id} style={{ marginBottom: "8px" }}>
          <strong>{msg.senderID === currentUserID ? "You" : msg.senderID}:</strong> {msg.content}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
