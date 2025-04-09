'use client';

import React, { useState } from 'react';
import { MessageSquare, Search, Phone, Video, MoreVertical, Send, Image, Paperclip, Smile, Clock } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  timestamp: string;
  isDoctor: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: number;
  sender: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  unread?: number;
  status?: 'online' | 'offline';
  lastSeen?: string;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: 1,
    sender: "Sarah Johnson",
    lastMessage: "Thank you for the prescription, doctor.",
    timestamp: "10:30 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    status: 'online',
    messages: [
      {
        id: 1,
        content: "Good morning Dr. Smith, I've been experiencing some discomfort.",
        timestamp: "10:15 AM",
        isDoctor: false,
      },
      {
        id: 2,
        content: "Hello Sarah, could you describe your symptoms in detail?",
        timestamp: "10:20 AM",
        isDoctor: true,
        status: 'read'
      },
      {
        id: 3,
        content: "Thank you for the prescription, doctor.",
        timestamp: "10:30 AM",
        isDoctor: false,
      }
    ]
  },
  {
    id: 2,
    sender: "Michael Brown",
    lastMessage: "When should I schedule my next appointment?",
    timestamp: "9:45 AM",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
    unread: 3,
    status: 'offline',
    lastSeen: '2 hours ago',
    messages: [
      {
        id: 1,
        content: "When should I schedule my next appointment?",
        timestamp: "9:45 AM",
        isDoctor: false,
      }
    ]
  },
  {
    id: 3,
    sender: "Emily Davis",
    lastMessage: "I've been feeling much better since starting the new medication.",
    timestamp: "Yesterday",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    status: 'online',
    messages: [
      {
        id: 1,
        content: "I've been feeling much better since starting the new medication.",
        timestamp: "Yesterday",
        isDoctor: false,
      }
    ]
  }
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const currentChat = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // Handle sending message logic here
    setMessageInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] p-8 flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="mt-2 text-gray-600">Chat with your patients</p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border overflow-hidden flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-16rem)]">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`p-4 hover:bg-gray-50 cursor-pointer flex items-start space-x-3 ${
                  selectedChat === conv.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.avatar}
                    alt={conv.sender}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conv.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{conv.sender}</h3>
                    <span className="text-xs text-gray-500">{conv.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  {conv.status === 'offline' && (
                    <span className="text-xs text-gray-400">Last seen {conv.lastSeen}</span>
                  )}
                </div>
                {conv.unread && (
                  <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conv.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {currentChat && (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img
                    src={currentChat.avatar}
                    alt={currentChat.sender}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentChat.sender}</h3>
                    <span className={`text-sm ${currentChat.status === 'online' ? 'text-green-500' : 'text-gray-500'}`}>
                      {currentChat.status === 'online' ? 'Online' : `Last seen ${currentChat.lastSeen}`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Video className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isDoctor ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isDoctor
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div className="flex items-center justify-end mt-1 space-x-1">
                        <span className="text-xs opacity-70">{message.timestamp}</span>
                        {message.isDoctor && message.status && (
                          <span className="text-xs opacity-70">✓✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Image className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex-1 relative">
                    <textarea
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      rows={1}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      style={{ minHeight: '42px', maxHeight: '120px' }}
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Smile className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}