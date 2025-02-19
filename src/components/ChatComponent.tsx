

// export default ChatComponent;
import React, { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { io } from "socket.io-client";

// Connect to the backend server
const socket = io("http://localhost:5000");

type Message = {
  id: number;
  text: string;
  sender: string;
};

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [userId] = useState("123"); // Hardcoded user ID
  const roomId = "12"; // Hardcoded room ID (fixed room 12)

  useEffect(() => {
    // Emit join event to the backend
    socket.emit("joinRoom", { roomId });
  
    socket.on("connect", () => {
      console.log("Successfully connected to the server!");
    });
  
    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      console.log("Received message: ", data); 
      const { message, sender } = data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: message, sender },
      ]);
    });
  
    return () => {
      socket.off("receiveMessage");
    };
  }, []);
  
  // Join the room 12 as soon as the component mounts
  // useEffect(() => {
  //   // Emit join room event to the server (though it's hardcoded in backend, we can keep this just for consistency)
  //   socket.emit("joinRoom", { roomId });

  //   console.log(`Joined room: ${roomId}`);

  //   // Listen for incoming messages
  //   socket.on("receiveMessage", (data) => {
  //     console.log("Received message: ", data); 
  //     const { message, sender } = data;
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { id: prevMessages.length + 1, text: message, sender },
  //     ]);
  //   });

  //   // Clean up on unmount
  //   return () => {
  //     socket.off("receiveMessage");
  //   };
  // }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Emit the message to the backend with the hardcoded roomId and senderId
      socket.emit("sendMessage", { roomId, message, sender: userId });
      console.log("Sent message: ", { roomId, message, sender: userId });  // Log sent message
  
      // Add message locally to update UI
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: message, sender: "You" },
      ]);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="h-[100vh] flex flex-col bg-gray-100">
      <div className="flex justify-between items-center py-4 px-6 bg-black text-white">
        <h2 className="text-xl font-semibold">Room 12</h2>
      </div>

      {/* Messages Container */}
      <div
        className="flex-1 overflow-auto px-4 py-2 flex flex-col-reverse space-y-4 space-y-reverse"
        style={{ scrollbarWidth: "thin" }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "You" ? "bg-black text-white" : "bg-gray-300"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center p-4 bg-white border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="p-3 rounded-full bg-black text-white hover:bg-blue-600 ml-2"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;




