import UserProfile from "@/components/UserProfile";
import { useMeQuery } from "@/service/api";
import { useAppSelector } from "@/store/store";

const Profile = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useMeQuery(undefined, { skip: !isAuthenticated });

  if(!data){
    return <h3>Profile Not found</h3>
  }

  if(isLoading){
    return <h3>Loading...</h3>
  }
  return (
    <div>
      <UserProfile data={data.data}/>
    </div>
  )
}

export default Profile