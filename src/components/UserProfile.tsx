
// import { FaUser } from "react-icons/fa";

// type User = {
//   name: string;
//   email: string;
//   role: string;
// };

// type Props = {
//   data: User;
// };

// function UserProfile(props: Props) {
//   const { name, email, role } = props.data;

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl rounded-lg p-8">
//       <div className="flex items-center space-x-6">
//         {/* Avatar */}
//         <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
//           <div className="flex justify-center items-center w-full h-full bg-gray-300">
//             <FaUser className="text-white text-5xl" />
//           </div>
//         </div>

//         {/* User Info */}
//         <div className="text-white">
//           <h2 className="text-3xl font-semibold">{name}</h2>
//           <p className="text-lg font-medium text-gray-200">{email}</p>
//           <p className="text-sm text-gray-300 mt-1">{role}</p>
//         </div>
//       </div>

  
//     </div>
//   );
// }

// export default UserProfile;
import { useUsersAllRoomsQuery } from '@/service/api';
import React, { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import GroupCard from './GroupList';

type User = {
  name: string;
  email: string;
  role: string;
};

type Props = {
  data: User;
};

function UserProfile(props: Props) {
  const { name, email, role } = props.data;


  const { data: groupsData, isLoading, isError } = useUsersAllRoomsQuery(undefined, {
    skip: !name, 
  });
  
console.log("hello",groupsData)
console.log(isError)
  
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    if (isError) {
      setErrorMessage('Failed to load groups. Please try again later.');
    }
  }, [isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl rounded-lg p-8">
      <div className="flex items-center space-x-6">
        {/* Avatar */}
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <div className="flex justify-center items-center w-full h-full bg-gray-300">
            <FaUser className="text-white text-5xl" />
          </div>
        </div>

        {/* User Info */}
        <div className="text-white">
          <h2 className="text-3xl font-semibold">{name}</h2>
          <p className="text-lg font-medium text-gray-200">{email}</p>
          <p className="text-sm text-gray-300 mt-1">{role}</p>
        </div>
      </div>

      {/* Display groups if available */}
      <div className="mt-6">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <h2 className="font-bold text-2xl text-white mt-4">Your Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {groupsData?.data && groupsData.data.createdGroups.map((group) => (
            <GroupCard
              key={group._id}
              groupName={group.name}
              groupId={group._id}
              isPrivate={group.isPrivate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
