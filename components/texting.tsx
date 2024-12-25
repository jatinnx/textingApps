"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/components/ui/separator"

interface Message {
  text: string;
  sender: string;
  timestamp: Date;
}

const Texting = ({ chatSelect, user }: { chatSelect: boolean; user: string }) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        text: message,
        sender: user,
        timestamp: new Date()
      }

      setMessages(prevMessages => [...prevMessages, newMessage])
      setMessage("") // Clear input after sending
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 h-[400px] overflow-y-auto pb-2">
        {chatSelect ? (
          <ScrollArea className="h-[400px] w-full rounded-md border p-2">
            <div className="flex flex-col gap-3 items-center">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="max-w-[80%] h-fit break-words bg-primary text-primary-foreground rounded-lg p-1  self-end"
                >
                  <p className="text-xs">{msg.text}</p>
                  <span className="text-[10px] opacity-70">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col h-full justify-center items-center">
            <p className="text-sm text-muted-foreground">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={!chatSelect}
          />
          <Button
            onClick={handleSend}
            disabled={!chatSelect || !message.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Texting