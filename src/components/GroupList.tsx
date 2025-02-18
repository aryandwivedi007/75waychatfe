import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaUsers } from "react-icons/fa"; // Optional: Icon for the members

type Props = {
  groupName: string;
  createdBy: string;
  groupId: string;
};

const GroupCard: React.FC<Props> = ({ groupName, createdBy, groupId }) => {
  return (
    <Link to={`/chats/${groupId}`} className="w-full sm:w-80 p-4">
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        {/* Group Header with Avatar */}
        <div className="flex items-center p-4 space-x-4">
          {/* Circular Avatar */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
            {/* You can add an img here if there's an avatar */}
          </div>

          {/* Group Name and Description */}
          <div className="flex-grow">
            <h2 className="text-lg font-semibold text-gray-800 truncate">{groupName}</h2>
            <p className="text-sm text-gray-600">Created by: {createdBy}</p>
          </div>
        </div>

        {/* Group Members Info */}
        <div className="flex items-center p-4 border-t border-gray-200">
          <FaUsers className="text-gray-600 mr-2" />
          {/* You can also display the number of members here */}
          <span className="text-sm text-gray-600">Members: 10</span> {/* Placeholder for number of members */}
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
