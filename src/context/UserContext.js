import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userID, setUserID] = useState(() => {
        return localStorage.getItem('userID') || null;
    });

    useEffect(() => {
        if (userID) {
            localStorage.setItem('userID', userID);
        } else {
            localStorage.removeItem('userID');
        }
    }, [userID]);

    return (
        <UserContext.Provider value={{ userID, setUserID }}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext};

