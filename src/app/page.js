'use client'
import { useState, useEffect } from 'react'
import MessageWindow from '@/components/MessageWindow'
import InputWindow from '@/components/InputWindow'
import NetworkLines from '@/components/NetworkLines'

export default function Home() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // Load initial messages
  }, [])

  return (
    <div className="interface-layer">
      <MessageWindow messages={messages} />
      <InputWindow />
      <NetworkLines />
    </div>
  )
}
