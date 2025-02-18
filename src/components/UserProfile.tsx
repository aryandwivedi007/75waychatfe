import { FaUser } from "react-icons/fa";

type User = {
  name: string;
  email: string;
  role: string;
};

type Props = {
  data: User;
};

function UserProfile(props: Props) {
    console.log(props.data)
  const { userName, email, role } = props.data;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center">
        {/* Avatar using Tailwind */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <div className="flex justify-center items-center w-full h-full bg-gray-300">
            <FaUser className="text-white text-4xl" />
          </div>
        </div>

        {/* User Info */}
        <div className="ml-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {userName}{" "}
            <span className="text-sm text-gray-600 lowercase">({role})</span>
          </h2>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>
      {/* Optional active status (uncomment if needed) */}
      {/* <div className="ml-24 mt-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Active
        </label>
      </div> */}
    </div>
  );
}

export default UserProfile;
