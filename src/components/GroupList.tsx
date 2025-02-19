import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaUsers, FaGlobe, FaMask } from "react-icons/fa"; // Importing public and private icons
import { motion } from "framer-motion"; // Import motion from framer-motion

type Props = {
  groupName: string;
  members: Number;
  groupId: string;
  isPrivate: boolean;
};

const GroupCard: React.FC<Props> = ({ groupName, members, groupId, isPrivate }) => {
  console.log("Is Private", isPrivate);
  return (
    <motion.div
      className="w-full sm:w-80 p-4 border-2 border-black rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link 
        to={`/chats/${groupId}`} 
        className="w-full text-gray-900 shadow-lg rounded-2xl  border-black overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out border-2"
      >
        {/* Group Header */}
        <div className="flex items-center p-4 space-x-4">
          {/* Group Icon (incognito effect for private groups, globe for public groups) */}
          <div
            className={`relative w-16 h-16 rounded-full overflow-hidden border-2 ${
              isPrivate ? 'bg-gray-500' : 'border-gray-300'
            }`}
          >
            {isPrivate ? (
              // Incognito-style: Add mask icon for private group
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <FaMask className="text-white text-2xl" />
              </div>
            ) : (
              // Public group: Add globe icon or another suitable icon
              <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-50">
                <FaGlobe className="text-white text-2xl" />
              </div>
            )}
          </div>

          {/* Group Name */}
          <div className="flex-grow">
            <h2 className="text-xl font-semibold text-gray-800 truncate">Group: {groupName}</h2>
            <p className="text-sm text-gray-600">Members: {members}</p>
            <p className="text-sm text-gray-600">{isPrivate ? 'Private Group' : 'Public Group'}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center p-4 border-t border-gray-100">
          <FaUsers className="text-gray-600 mr-2" />
        </div>
      </Link>
    </motion.div>
  );
};

export default GroupCard;

