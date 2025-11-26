
/* 
AUTHOR: Hudson Cho
CREATED: 11.22.2025
UPDATED: 11.23.2025
DESCRIPTION:
    MessageBox component that renders a box that users can scroll through 
    to see previous messages. On load it fetches messagse for the given
    conversation and loads them into a message box. Messages are dynamically
    retreived from socket.io connection to support real time communication.
*/
import React, { useEffect, useState, useRef } from "react";

import { socket } from "../socket";

export default function MessageBox({ currentUserID, recipientID, circleID }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // retreives existing messages when the page is loaded 
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // sets url to either a direct message or a circle message
        let url = '';
        if (recipientID) {
          url = `http://localhost:3000/messages/direct?recipientID=${recipientID}`;
        } else if (circleID) {
          url = `http://localhost:3000/messages/circle/${circleID}`;
        }

        // fetches the messages while passing authentication token
        const res = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        // if no messages previously sent data is set as an empty array
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [recipientID, circleID]);

  // retreive messages from socket.io as they are sent to the socket
  useEffect(() => {
    const handleReceiveMessage = (message) => {
    // Circle messages
    if (circleID && message.circle_id === circleID) {
      setMessages(prev => [...prev, message]);
    }
    // Direct messages
    else if (recipientID && (
      (message.sender_id === recipientID && message.recipient_id === currentUserID) ||
      (message.sender_id === currentUserID && message.recipient_id === recipientID)
    )) {
      setMessages(prev => [...prev, message]);
    }
    // Otherwise ignore
  };

  socket.on("receiveMessage", handleReceiveMessage);
  }, [currentUserID, recipientID, circleID]);

  // load messages top to bottom, updating messagesEndRef
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // display all messages newest to oldest in the chat box
  return (
<div style={{ flex: 1, overflowY: "scroll", border: "1px solid #000000ff", padding: "10px", minHeight: 0, backgroundColor: '#d6d6d6'}}>

      {messages.map((msg) => (
        <div key={msg.id} style={{ marginBottom: "8px" }}>
          <strong>{msg.sender_id === currentUserID ? "You" : msg.sender_username}:</strong> {msg.content}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
