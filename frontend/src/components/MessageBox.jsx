import React, { useEffect, useRef } from "react";

export default function MessagesBox({ messages }) {
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        height: "400px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
        background: "#1e1e1e",
        color: "white",
      }}
    >
      {messages.map((msg, index) => (
        <div key={index} style={{ marginBottom: "8px" }}>
          <strong>{msg.sender}</strong>: {msg.text}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}