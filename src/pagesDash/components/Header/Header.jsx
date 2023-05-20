import React from 'react'
import { logout } from '../../config/firebase';

const Header = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h2>
        Header
      </h2>
      <button onClick={handleLogout}>Logout</button>


    </div>
  )
}

export default Header