import React, { useState } from 'react';
import { AddGroup } from '@/components/AddGroup'; // Import the AddGroup modal
import GroupCard from '@/components/GroupList';
import { useRoomsQuery } from '@/service/api';
import { useAppSelector } from '@/store/store';
import { FaPlus } from 'react-icons/fa'; // Import the Plus Icon

const Home = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useRoomsQuery(undefined, { skip: !isAuthenticated });
  console.log(data);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // Toggle modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative">
      {/* Plus Icon */}
      <div className="absolute top-4 right-4">
        <button
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-all duration-300"
          onClick={openModal} // Open the modal on click
        >
          <FaPlus size={24} />
        </button>
      </div>

      <center><h2 className="font-bold text-3xl">Your Groups</h2></center>

      {/* Grid to display groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {data && data.data.createdRooms.map((group) => (
          <GroupCard
            key={group._id}
            groupName={group.name}
            createdBy={data.data.userName}
            groupId={group._id}
          />
        ))}
      </div>

      {/* Conditionally render the modal */}
      {isModalOpen && <div className='flex justify-center items-center'><AddGroup closeModal={closeModal} /></div>}
    </div>
  );
};

export default Home;
