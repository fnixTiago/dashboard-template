import React from 'react'
import {  Outlet } from 'react-router-dom'
import UserContextProvider from '../../context/UserContext';

const RootLayout = () => {
  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  )
}

export default RootLayout