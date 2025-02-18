
import GroupCard from '@/components/GroupList';
import { useRoomsQuery } from '@/service/api';
import { useAppSelector } from '@/store/store';

const Home = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useRoomsQuery(undefined, { skip: !isAuthenticated });
  console.log(data);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  console.log(data?.data.userName)

  if (data && data.data) {
    return (
      <div>
          <center><h2 className='font-bold text-3xl'>Your Groups</h2></center>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {data.data.createdRooms.map((group) => (
          <GroupCard key={group._id} groupName={group.name} createdBy={data.data.userName} groupId={group._id} />
        ))}
      </div>
      </div>
    );
  }

  return <h2>No groups available</h2>;
};

export default Home;
