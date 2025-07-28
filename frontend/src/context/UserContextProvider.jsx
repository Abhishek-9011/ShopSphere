import React, { useState } from 'react'
import UserContext from './UserContext'

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <div>
      <UserContext.Provider value={{user, setUser}}>
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default UserContextProvider
