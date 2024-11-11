'use client'
import { useState, useEffect } from 'react'
import { saveMessagesLocally, loadMessagesLocally } from '@/lib/messageStorage'

export default function Home() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // Load messages from local storage when component mounts
    const savedMessages = loadMessagesLocally()
    setMessages(savedMessages)
  }, [])

  const addMessage = (newMessage) => {
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    saveMessagesLocally(updatedMessages)
  }

  return (
    <div className="interface-layer">
      <div className="window message-window">
        <div className="glitch-text">NETWORK_TRANSMISSION</div>
        <div id="messages">
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
      
      <div className="window input-window">
        <textarea 
          className="digital-input" 
          placeholder="INPUT_TRANSMISSION"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              addMessage(e.target.value)
              e.target.value = ''
            }
          }}
        ></textarea>
      </div>
    </div>
  )
}
