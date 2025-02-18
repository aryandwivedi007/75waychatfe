import UserList from '@/components/UserList'
import { useAllUsersQuery } from '@/service/api';
import { useAppSelector } from '@/store/store';
import React from 'react'

export const AllUsersPage = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
      const { data, isLoading } = useAllUsersQuery(undefined, { skip: !isAuthenticated });
      console.log(data)
      if(isLoading){
        return <h2>Loading</h2>
      }
      if(!data || data.length==0){
        return
      }
  return (
    <div>
        <UserList data={data.data}/>
    </div>
  )
}
