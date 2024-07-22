// src/services/AuthContext.js
import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const syncAuth = () => {
        const user = JSON.parse(sessionStorage.getItem('currentUser'));
        setCurrentUser(user);
    };

    useEffect(() => {
        // use sessionStorage to retrieve user auth
        // & Initialize currentUser from sessionStorage
        syncAuth();

        // Add event listener to sync currentUser when sessionStorage changes
        // because using useContext this way the page will not rerender
        // which leads to the mismatch and delay of user information
        window.addEventListener('storage', syncAuth);
        return () => {
            window.removeEventListener('storage', syncAuth);
        };
    }, []);

    const value = {
        currentUser,
        setCurrentUser,// This allows other components to update the currentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
