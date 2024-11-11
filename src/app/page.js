'use client';
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onChildAdded } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    
    const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
      const newMessage = snapshot.val();
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messagesRef = ref(database, 'messages');
    push(messagesRef, {
      text: input,
      timestamp: Date.now(),
      userId: Math.random().toString(36).substr(2, 9)
    });

    setInput('');
  };

  return (
    <main style={{
      backgroundColor: '#000814',
      color: '#00ff41',
      fontFamily: 'Courier New, monospace',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        width: '80%',
        maxWidth: '600px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '20px',
        borderRadius: '10px'
      }}>
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          marginBottom: '20px'
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #00ff41'
            }}>
              <div style={{ color: '#00d4ff' }}>user::{msg.userId}</div>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} style={{ display: 'flex' }}>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="layer connections..."
            style={{
              flexGrow: 1,
              backgroundColor: 'transparent',
              color: '#00ff41',
              border: '1px solid #00ff41',
              padding: '10px'
            }}
          />
          <button type="submit" style={{
            backgroundColor: '#00ff41',
            color: '#000814',
            border: 'none',
            padding: '10px 20px'
          }}>
            TRANSMIT
          </button>
        </form>
      </div>
    </main>
  );
}
