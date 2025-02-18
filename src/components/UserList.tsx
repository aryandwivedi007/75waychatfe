type Props = {
    data: User[];
  };
  
  const UserList: React.FC<Props> = ({ data }) => {
    return (
      <div className="flex flex-col space-y-4 w-64">
        {/* Map through the data array and render each user's userName */}
        {data.map((d) => (
          <div
            key={d._id}
            className="bg-white p-5 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 hover:text-indigo-600">{d.userName}</h2>
          </div>
        ))}
      </div>
    );
  };
  
  export default UserList;
  