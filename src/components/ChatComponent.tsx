// import { useEffect, useState } from "react";
// import { FaPaperPlane } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import { io } from "socket.io-client";
// import { useAppSelector } from "@/store/store";
// import { useGetRoomMessagesQuery } from "@/service/api";

// type Message = {
//   id: number;
//   text: string;
//   sender: string;
// };

// const socket = io("http://localhost:5000"); // Adjust the backend URL accordingly

// const ChatComponent = () => {
//   const { groupId } = useParams(); // Get groupId from URL params
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState("");
//   const [userId, setUserId] = useState("123"); // Replace with actual user ID (can be fetched from the user session)
  
//   if (!groupId) {
//     return <div>Invalid group ID</div>;
//   }

//   const { isAuthenticated } = useAppSelector((state) => state.auth); // Check if user is authenticated
//   const { data: RoomWithChat, isLoading, error } = useGetRoomMessagesQuery(
//     { roomId: groupId },
//     { skip: !isAuthenticated } // Skip query if not authenticated
//   );

//   useEffect(() => {
//     // Join the room when the component mounts
//     if (groupId) {
//       socket.emit("joinRoom", { roomId: groupId, userId });
//     }

//     // Listen for incoming messages
//     socket.on("receiveMessage", (data) => {
//       const { roomId, message } = data;
//       if (roomId === groupId) {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { id: prevMessages.length + 1, text: message, sender: "Other User" },
//         ]);
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [groupId, userId]);

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       // Send the message through socket
//       socket.emit("sendMessage", { roomId: groupId, userId, message });

//       // Add the message to the local state (assuming the message is sent by the user)
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { id: prevMessages.length + 1, text: message, sender: "You" },
//       ]);
//       setMessage(""); // Clear input after sending
//     }
//   };

//   useEffect(() => {
//     // Fetch room messages when the RoomWithChat data is available
//     if (RoomWithChat) {
//       const initialMessages = RoomWithChat?.data.messages.map((msg, index) => ({
//         id: index + 1,
//         text: msg.text,
//         sender: msg.sender,
//       }));
//       setMessages(initialMessages || []);
//     }
//   }, [RoomWithChat]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading messages</div>;
//   const [showInviteModal, setShowInviteModal] = useState(false); 
//   const handleInviteClick = () => {
//     setShowInviteModal(true);
//     console.log("Invite button clicked!");
//     // You can implement an invite modal or direct to another page for inviting
//   };

//   return (
//     <div className="flex flex-col max-w-xl mx-auto bg-white rounded-lg shadow-lg p-4">
//       {/* Room Name */}
//       <div className="flex justify-between items-center py-2 mb-4 border-b">
//         <h2 className="text-xl font-semibold">{RoomWithChat?.data.name}</h2>
//         <button
//           onClick={handleInviteClick}
//           className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           Invite Others
//         </button>
//       </div>

//       <div className="flex flex-col space-y-4 overflow-y-auto max-h-80 mb-4">
//         {/* Displaying Messages */}
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`p-3 rounded-lg max-w-xs ${
//                 msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               <p>{msg.text}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Field and Send Button */}
//       <div className="flex items-center space-x-2 mt-4">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           <FaPaperPlane />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;
// import React, { useEffect, useState } from "react";
// import { FaPaperPlane } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import { io } from "socket.io-client";
// import { useAppSelector } from "@/store/store";
// import { useGetRoomMessagesQuery } from "@/service/api";
// import InviteModal from "./InviteModel";
// import { Button } from "./ui/button";

// const socket = io("http://localhost:5000");

// type Message = {
//   id: number;
//   text: string;
//   sender: string;
// };

// const ChatComponent: React.FC = () => {
//   const { groupId } = useParams();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState("");
//   const [showInviteModal, setShowInviteModal] = useState(false); // Modal visibility state
//   const [userId, setUserId] = useState("123"); // Replace with actual user ID (can be fetched from the user session)

//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const { data: RoomWithChat, isLoading, error } = useGetRoomMessagesQuery(
//     { roomId: groupId },
//     { skip: !isAuthenticated }
//   );

//   if (!groupId) {
//     return <div>Invalid group ID</div>;
//   }

//   useEffect(() => {
//     // Join the room when the component mounts
//     if (groupId) {
//       socket.emit("joinRoom", { roomId: groupId, userId });
//     }

//     // Listen for incoming messages
//     socket.on("receiveMessage", (data) => {
//       const { roomId, message } = data;
//       if (roomId === groupId) {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { id: prevMessages.length + 1, text: message, sender: "Other User" },
//         ]);
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [groupId, userId]);

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       socket.emit("sendMessage", { roomId: groupId, userId, message });

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { id: prevMessages.length + 1, text: message, sender: "You" },
//       ]);
//       setMessage(""); // Clear input after sending
//     }
//   };

//   useEffect(() => {
//     if (RoomWithChat) {
//       const initialMessages = RoomWithChat?.data.messages.map((msg, index) => ({
//         id: index + 1,
//         text: msg.text,
//         sender: msg.sender,
//       }));
//       setMessages(initialMessages || []);
//     }
//   }, [RoomWithChat]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading messages</div>;

//   const handleInviteClick = () => {
//     setShowInviteModal(true); // Open InviteModal
//   };

//   const handleCloseInviteModal = () => {
//     setShowInviteModal(false); // Close InviteModal
//   };

//   return (
//     <div className="h-[100vh] flex flex-col bg-gray-100">
//       <div className="flex justify-between items-center py-4 px-6 bg-black text-white">
//         <h2 className="text-xl font-semibold">{RoomWithChat?.data.name}</h2>
//         <Button
//           onClick={handleInviteClick}
//           className="p-2 bg-black text-white rounded-lg hover:bg-blue-700"
//         >
//           Invite Others
//         </Button>
//       </div>

//       {/* Messages Container */}
//       <div
//         className="flex-1 overflow-auto px-4 py-2 flex flex-col-reverse space-y-4 space-y-reverse"
//         style={{ scrollbarWidth: "thin" }}
//       >
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`p-3 rounded-lg max-w-xs ${
//                 msg.sender === "You" ? "bg-black text-white" : "bg-gray-300"
//               }`}
//             >
//               <p>{msg.text}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Message Input */}
//       <div className="flex items-center p-4 bg-white border-t">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="p-3 rounded-full bg-black text-white hover:bg-blue-600 ml-2"
//         >
//           <FaPaperPlane />
//         </button>
//       </div>

//       {/* Invite Modal */}
//       <InviteModal
//         isOpen={showInviteModal}
//         onClose={handleCloseInviteModal}
//         groupId={groupId as string}
//       />
//     </div>
//   );
// };

// export default ChatComponent;

// import React, { useEffect, useState } from "react";
// import { FaPaperPlane } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import { io } from "socket.io-client";
// import { useAppSelector } from "@/store/store";
// import { useGetRoomMessagesQuery } from "@/service/api";
// import InviteModal from "./InviteModel";
// import { Button } from "./ui/button";

// const socket = io("http://localhost:5000");

// type Message = {
//   id: number;
//   text: string;
//   sender: string;
// };

// const ChatComponent: React.FC = () => {
//   const { groupId } = useParams();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState("");
//   const [showInviteModal, setShowInviteModal] = useState(false);
//   const [userId, setUserId] = useState("123"); // Replace with actual user ID

//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const { data: RoomWithChat, isLoading, error } = useGetRoomMessagesQuery(
//     { roomId: groupId },
//     { skip: !isAuthenticated }
//   );

//   if (!groupId) {
//     return <div>Invalid group ID</div>;
//   }

//   useEffect(() => {
//     // Join the room when the component mounts
//     if (groupId) {
//       socket.emit("joinRoom", { roomId: groupId, userId });
//     }

//     socket.on('connect', () => {
//       console.log('Connected to the server');
//     });
    

//     // Listen for incoming messages
//     socket.on("receiveMessage", (data) => {
//       const { roomId, message } = data;
//      // if (roomId === groupId) {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { id: prevMessages.length + 1, text: message, sender: "Other User" },
//         ]);
//       //}
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [groupId, userId]);

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       socket.emit("sendMessage", { roomId: groupId, userId, message });

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { id: prevMessages.length + 1, text: message, sender: "You" },
//       ]);
//       setMessage(""); // Clear input after sending
//     }
//   };

//   useEffect(() => {
//     if (RoomWithChat) {
//       const initialMessages = RoomWithChat?.data.messages.map((msg, index) => ({
//         id: index + 1,
//         text: msg.text,
//         sender: msg.sender,
//       }));
//       setMessages(initialMessages || []);
//     }
//   }, [RoomWithChat]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading messages</div>;

//   const handleInviteClick = () => {
//     setShowInviteModal(true); // Open InviteModal
//   };

//   const handleCloseInviteModal = () => {
//     setShowInviteModal(false); // Close InviteModal
//   };

//   return (
//     <div className="h-[100vh] flex flex-col bg-gray-100">
//       <div className="flex justify-between items-center py-4 px-6 bg-black text-white">
//         <h2 className="text-xl font-semibold">{RoomWithChat?.data.name}</h2>
//         <Button
//           onClick={handleInviteClick}
//           className="p-2 bg-black text-white rounded-lg hover:bg-blue-700"
//         >
//           Invite Others
//         </Button>
//       </div>

//       {/* Messages Container */}
//       <div
//         className="flex-1 overflow-auto px-4 py-2 flex flex-col-reverse space-y-4 space-y-reverse"
//         style={{ scrollbarWidth: "thin" }}
//       >
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`p-3 rounded-lg max-w-xs ${
//                 msg.sender === "You" ? "bg-black text-white" : "bg-gray-300"
//               }`}
//             >
//               <p>{msg.text}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Message Input */}
//       <div className="flex items-center p-4 bg-white border-t">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="p-3 rounded-full bg-black text-white hover:bg-blue-600 ml-2"
//         >
//           <FaPaperPlane />
//         </button>
//       </div>

//       {/* Invite Modal */}
//       <InviteModal
//         isOpen={showInviteModal}
//         onClose={handleCloseInviteModal}
//         groupId={groupId as string}
//       />
//     </div>
//   );
// };

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




