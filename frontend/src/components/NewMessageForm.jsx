import React, { useEffect, useState, useRef } from "react";
export default function NewMessageForm({ onSend, onClose }) {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(username, message);
    setUsername('');
    setMessage('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#5d76a7ff',
      padding: '20px',
      border: '1px solid #000000ff',
      borderRadius: '8px',
      zIndex: 20000,
    }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
