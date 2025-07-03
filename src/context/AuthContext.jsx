import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData, callback) => {
        // In a real app, this would be an API call.
        // We'll just set a dummy user object.
        const fakeUser = { email: userData.email, name: "Admin User" };
        setUser(fakeUser);
        if (callback) callback();
    };

    const logout = (callback) => {
        setUser(null);
        if (callback) callback();
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
}; 