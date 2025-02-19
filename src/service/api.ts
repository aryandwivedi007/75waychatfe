// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store/store";

// const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: baseUrl,
//     prepareHeaders: (headers, { getState }) => {
//       // Access the state from Redux
      
//       const token = (getState() as RootState).auth.accessToken;
//       console.log(token)
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }

//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     me: builder.query<ApiResponse<User>, void>({
//       query: () => `/users/loggedInUser/get`,
//     }),
//     login: builder.mutation<ApiResponse<{ accessToken: string, refreshToken: string }>, { email: string, password: string }>({
//       query: (body) => {
//         return { url: `/auth/authenticate`, method: 'POST', body }
//       },
//     }),
//     register: builder.mutation<ApiResponse<User>, Omit<User, '_id' | 'active' | 'role'> & { confirmPassword: string }>({
//       query: (body) => {
//         return { url: `/users`, method: 'POST', body }
//       },
//     }),
//     updateUser: builder.mutation<ApiResponse<User>, User>({
//       query: (body) => {
//         return { url: `/users/${body._id}`, method: 'PUT', body }
//       },
//     }),
//     logout: builder.mutation<void, void>({
//       query: () => {
//         return { url: `/auth/logout`, method: 'POST', }
//       },
//     }),
//     rooms:builder.query<ApiResponse<userRoom>,void>({
//       query:()=>{
//         return {url:`users/rooms/getAllRooms`,method:'GET'}
//       }
//     }),
//     allUsers:builder.query<ApiResponse<User[]>,void>({
//       query:()=>{
//         return {url:`users/getAllUsers`,method:'GET'}
//       }
//     })
//   }),
// });

// export const { useMeQuery, useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation,useRoomsQuery,useAllUsersQuery } = api;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Access the state from Redux
      
      const token = (getState() as RootState).auth.accessToken;
      console.log(token)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    me: builder.query<ApiResponse<User>, void>({
      query: () => `/users/loggedInUser/get`,
    }),
    login: builder.mutation<ApiResponse<{ accessToken: string, refreshToken: string }>, { email: string, password: string }>({
      query: (body) => {
        return { url: `/auth/authenticate`, method: 'POST', body }
      },
    }),
    register: builder.mutation<ApiResponse<User>, Omit<User, '_id' | 'active' | 'role'> & { confirmPassword: string }>({
      query: (body) => {
        return { url: `/users`, method: 'POST', body }
      },
    }),
    updateUser: builder.mutation<ApiResponse<User>, User>({
      query: (body) => {
        return { url: `/users/${body._id}`, method: 'PUT', body }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => {
        return { url: `/auth/logout`, method: 'POST', }
      },
    }),
    rooms:builder.query<ApiResponse<userRoom>,void>({
      query:()=>{
        return {url:`users/rooms/getAllRooms`,method:'GET'}
      }
    }),
    allUsers:builder.query<ApiResponse<User[]>,void>({
      query:()=>{
        return {url:`users/getAllUsers`,method:'GET'}
      }
    }),
    allRooms:builder.query<ApiResponse<Room[]>,void>({
      query:()=>{
        return {url:`rooms/getAllRooms/rooms`,method:'GET'}
      }
    }),
    usersAllRooms:builder.query<ApiResponse<Room[]>,void>({
      query:()=>{
        return {url:`users/rooms/getAllRooms`,method:'GET'}
      }
    }),
    getRoomMessages: builder.query<ApiResponse<RoomWithChat>, { roomId: string }>({
      query: ({ roomId }) => ({
        url: `rooms/${roomId}`,  // Assuming this API route fetches messages for the room
        method: 'GET',
      }),
    }),
    
    createRoom: builder.mutation<ApiResponse<Room>, Omit<Room, '_id'>>({
      query: (roomData) => ({
        url: 'rooms',
        method: 'POST',
        body: roomData,
      }),
    }),
    sendRoomInvite:builder.mutation<ApiResponse<string>,InviteData>({
      query:(body)=>({url:'/rooms/invite',method:'POST',body})
    }),
    handleRoomInvite: builder.mutation<ApiResponse<string>, { _roomId: string;  }>({
      query: ({ _roomId }) => ({
        url: `rooms/${_roomId}/invite`,
        method: 'PATCH',
      }),
    }),

    updateRoomMembers: builder.mutation<
  ApiResponse<string>,
  { roomId: string; action: 'add' | 'remove' }
>({
  query: ({ roomId, action }) => ({
    url: `rooms/${roomId}/${action}`,
    method: 'PATCH',
  }),
}),

  
    
    
  }),
});

export const { useMeQuery, 
  useLoginMutation,
   useLogoutMutation, 
   useRegisterMutation, 
   useUpdateUserMutation,
   useRoomsQuery,
   useAllUsersQuery ,
   useCreateRoomMutation,
   useAllRoomsQuery,
   useSendRoomInviteMutation,
   useGetRoomMessagesQuery,
   useUsersAllRoomsQuery
  } = api;