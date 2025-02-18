import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa"; // Send icon

type Message = {
  id: number;
  text: string;
  sender: string;
};

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey! How are you?", sender: "John" },
    { id: 2, text: "I'm good, thanks for asking!", sender: "You" },
  ]);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "You",
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setNewMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto bg-white rounded-lg shadow-lg p-4">
      <div className="flex flex-col space-y-4 overflow-y-auto max-h-80 mb-4">
        {/* Displaying Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                message.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field and Send Button */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
