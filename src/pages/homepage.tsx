// import React, { useState } from 'react';
// import GroupCard from '@/components/GroupList';
// import { useAllRoomsQuery, useRoomsQuery } from '@/service/api';
// import { useAppSelector } from '@/store/store';
// import { FaPlus } from 'react-icons/fa'; // Import the Plus Icon
// import { AddGroup } from '@/components/AddGroup';
// import { number } from 'yup';

// const Home = () => {
//   // State to control modal visibility
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   const { data, isLoading } = useRoomsQuery(undefined, { skip: !isAuthenticated });
//   const { data: AllGroups } = useAllRoomsQuery(undefined, { skip: !isAuthenticated });
//   console.log(AllGroups)
//   if (isLoading) {
//     return <h2>Loading...</h2>;
//   }

//   // Toggle modal visibility
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className="relative mx-24 h-[100vh]">
//       {/* Plus Icon */}
//       <div className="absolute top-4 right-4 ">
//         <button
//           className="bg-black text-white p-3 rounded-full hover:bg-blue-600 transition-all duration-300"
//           onClick={openModal} // Open the modal on click
//         >
//           <FaPlus size={24} />
//         </button>
//       </div>

//       {isModalOpen && (
//   <div className="absolute inset-0 flex justify-center items-center z-50">
//     <AddGroup closeModal={closeModal} />
//   </div>
// )}

//       {/* Your Groups */}
//       {/* <center><h2 className="font-bold text-3xl mt-12">Your Groups</h2></center> */}

//       {/* Grid to display created groups */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 mx-14">
//         {data && data.data.createdRooms.map((group) => (
//           <GroupCard
//             key={group._id}
//             groupName={group.name}
//             createdBy={data.data.userName}
//             groupId={group._id}
            
//           />
//         ))}
//       </div>

//       {/* Display All Groups */}
//       <center><h2 className="font-bold text-3xl mt-12">All Groups</h2></center>

//       {/* Grid to display all groups */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
//         {AllGroups && AllGroups.data.map((group) => (
//           <GroupCard
//             key={group._id}
//             groupName={group.name}
//             groupId={group._id}
//             isPrivate={group.isPrivate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useMemo } from 'react';
import GroupCard from '@/components/GroupList';
import { useAllRoomsQuery, useRoomsQuery } from '@/service/api';
import { useAppSelector } from '@/store/store';
import { FaPlus } from 'react-icons/fa'; // Import the Plus Icon
import { AddGroup } from '@/components/AddGroup';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Fetch the data using queries
  const { data, isLoading } = useRoomsQuery(undefined, { skip: !isAuthenticated });
  const { data: AllGroups } = useAllRoomsQuery(undefined, { skip: !isAuthenticated });

  // Memoize the created rooms so it won't re-render unless data changes
  const memoizedCreatedRooms = useMemo(() => {
    return data?.data.createdRooms || [];
  }, [data]);

  const memoizedAllGroups = useMemo(() => {
    return AllGroups?.data || [];
  }, [AllGroups]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // Toggle modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative mx-24 h-[100vh]">
      {/* Plus Icon */}
      <div className="absolute top-4 right-4 ">
        <button
          className="bg-black text-white p-3 rounded-full hover:bg-blue-600 transition-all duration-300"
          onClick={openModal} // Open the modal on click
        >
          <FaPlus size={24} />
        </button>
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 flex justify-center items-center z-50">
          <AddGroup closeModal={closeModal} />
        </div>
      )}

      {/* Your Groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 mx-14">
        {memoizedCreatedRooms.map((group) => (
          <GroupCard
            key={group._id}
            groupName={group.name}
            createdBy={data?.data.userName}
            groupId={group._id}
          />
        ))}
      </div>

      {/* Display All Groups */}
      <center><h2 className="font-bold text-3xl mt-12">All Groups</h2></center>

      {/* Grid to display all groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {memoizedAllGroups.map((group) => (
          <GroupCard
            key={group._id}
            groupName={group.name}
            groupId={group._id}
            isPrivate={group.isPrivate}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
