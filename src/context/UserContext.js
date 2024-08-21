import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserID] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserID }}>
      {children}
    </UserContext.Provider>
  );
};
