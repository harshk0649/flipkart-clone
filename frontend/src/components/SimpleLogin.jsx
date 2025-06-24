import React, { useState } from 'react';

const SimpleLogin = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Simple login submitted:', { email, password });
    alert(`Login attempt: ${email} / ${password}`);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          width: '400px',
          maxWidth: '90vw'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ marginBottom: '20px' }}>Simple Login Test</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                console.log('Email changed:', e.target.value);
                setEmail(e.target.value);
              }}
              onClick={() => console.log('Email input clicked')}
              onFocus={() => console.log('Email input focused')}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #007bff',
                borderRadius: '4px',
                fontSize: '16px',
                backgroundColor: '#f0f8ff'
              }}
              placeholder="Enter email"
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                console.log('Password changed:', e.target.value);
                setPassword(e.target.value);
              }}
              onClick={() => console.log('Password input clicked')}
              onFocus={() => console.log('Password input focused')}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #007bff',
                borderRadius: '4px',
                fontSize: '16px',
                backgroundColor: '#f0f8ff'
              }}
              placeholder="Enter password"
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
            
            <button
              type="button"
              onClick={() => {
                console.log('Demo button clicked');
                setEmail('demo@flipkart.com');
                setPassword('demo123');
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Use Demo
            </button>
            
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </form>

        <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
          Current values: Email="{email}", Password="{password}"
        </div>
      </div>
    </div>
  );
};

export default SimpleLogin;
