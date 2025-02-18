

import './App.css'


import { Route, Routes } from 'react-router-dom'

import Home from './pages/homepage'
import Profile from './pages/profilepage'
import Login from './pages/loginpage'
import Register from './pages/signuppage'
import AuthenticatedLayout from './layout/Authenticated'
import BasicLayout from './layout/Basic'
import { AllUsersPage } from './pages/AllUsersPage'
import ChatPage from './pages/ChatPage'

function App() {


  return (
    <>
    <Routes>
      <Route element={<AuthenticatedLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/allUsers" element={<AllUsersPage />} />
        <Route path='/chats/:groupId' element={<ChatPage/>}/>
      </Route>
      <Route element={<BasicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
