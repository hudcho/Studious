import React, { useState } from "react";

export default function CreateCircleForm({ onCreate, onClose }) {
  const [name, setName] = useState('');
  const [members, setMembers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const memberList = members
      .split(',')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    onCreate({ name, members: memberList });

    setName('');
    setMembers('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#5d76a7ff',
      padding: '20px',
      border: '1px solid #000000ff',
      borderRadius: '8px',
      zIndex: 20000,
      minWidth: '300px'
    }}>
      <h3>Create Circle</h3>
      <form onSubmit={handleSubmit}>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Circle Name:</label><br/>
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Members (comma separated usernames):</label><br/>
          <input
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            placeholder="alice, bob, charlie"
          />
        </div>

        <button type="submit">Create</button>
        <button type="button" style={{ marginLeft: '10px' }} onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
