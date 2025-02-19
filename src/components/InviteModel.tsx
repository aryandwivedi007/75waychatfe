// import { useAllUsersQuery, useSendRoomInviteMutation } from "@/service/api";
// import { useAppSelector } from "@/store/store";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// type InviteModalProps = {
//     isOpen: boolean;
//     onClose: () => void;
//     groupId: string;
//   };

//   const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, groupId }) => {
//     const { isAuthenticated } = useAppSelector((state) => state.auth);
//     const { data: users, isLoading: isUsersLoading, error } = useAllUsersQuery(undefined, {
//       skip: !isAuthenticated,
//     });
//     const [sendRoomInvite] = useSendRoomInviteMutation();
//     const [selectedUser, setSelectedUser] = useState<string | null>(null);

//     const handleInvite = async () => {
//       if (!selectedUser) {
//         toast.error("Please select a user to invite");
//         return;
//       }

//       try {
//         await sendRoomInvite({
//           roomId: groupId,
//           userId: selectedUser, // Replace with the actual userId of the current user
//           toBeInvitedId: selectedUser,
//         });
//         toast.success("Invite sent successfully!");
//         onClose(); // Close modal after invite
//       } catch (error: any) {
//         console.log(error);
//         toast.error("Error sending invite");
//       }
//     };

//     useEffect(() => {
//       // Reset the selected user whenever the modal is closed
//       if (!isOpen) {
//         setSelectedUser(null);
//       }
//     }, [isOpen]);

//     if (isUsersLoading) return <div>Loading users...</div>;
//     if (error) return <div>Error loading users</div>;

//     return (
//       isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white text-black p-6 rounded-lg max-w-md w-full">
//             <h3 className="text-xl font-semibold mb-4">Select User to Invite</h3>

//             {/* List of Users */}
//             <ul className="space-y-2">
//               {users.data?.map((user) => (
//                 <li
//                   key={user._id}
//                   className={`cursor-pointer p-2 rounded-md ${
//                     selectedUser === user._id ? "bg-blue-200" : "hover:bg-gray-200"
//                   }`}
//                   onClick={() => setSelectedUser(user._id)}
//                 >
//                   <div className="flex items-center">
//                     <FaUsers className="mr-2 text-gray-600" />
//                     <span>{user.userName}</span>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             {/* Actions */}
//             <div className="mt-4 flex justify-between items-center">
//               <button
//                 onClick={onClose}
//                 className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleInvite}
//                 className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//                 disabled={!selectedUser}
//               >
//                 Send Invite
//               </button>
//             </div>
//           </div>
//         </div>
//       )
//     );
//   };


import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useAppSelector } from "@/store/store";
import { useAllUsersQuery, useSendRoomInviteMutation } from "@/service/api";
import { toast } from "react-toastify";

// InviteModal Component
type InviteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    groupId: string;
};

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, groupId }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const { data: users, isLoading: isUsersLoading, error } = useAllUsersQuery(undefined, {
        skip: !isAuthenticated,
    });
    const [sendRoomInvite] = useSendRoomInviteMutation();
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const handleInvite = async () => {
        if (!selectedUser) {
            toast.error("Please select a user to invite");
            return;
        }
        console.log(groupId,selectedUser,selectedUser,"dhdjh")
        try {
            await sendRoomInvite({
                roomId: groupId,
                userId: selectedUser,
                toBeInvitedId: selectedUser,
            });
            toast.success("Invite sent successfully!");
            onClose(); // Close modal after invite
        } catch (error: any) {
            console.log(error);
            toast.error("Error sending invite");
        }
    };

    // Reset the selected user whenever the modal is closed
    useEffect(() => {
        if (!isOpen) {
            setSelectedUser(null);
        }
    }, [isOpen]);

    if (isUsersLoading) return <div>Loading users...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white text-black p-6 rounded-lg max-w-md w-full">
                    <h3 className="text-xl font-semibold mb-4">Select User to Invite</h3>

                    {/* List of Users */}
                    <ul className="space-y-2">
                        {users.data?.map((user) => (
                            <li
                                key={user._id}
                                className={`cursor-pointer p-2 rounded-md ${selectedUser === user._id ? "bg-blue-200" : "hover:bg-gray-200"
                                    }`}
                                onClick={() => setSelectedUser(user._id)}
                            >
                                <div className="flex items-center">
                                    <FaUsers className="mr-2 text-gray-600" />
                                    <span>{user.userName}</span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Actions */}
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={onClose}
                            className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleInvite}
                            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            disabled={!selectedUser}
                        >
                            Send Invite
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default InviteModal;
