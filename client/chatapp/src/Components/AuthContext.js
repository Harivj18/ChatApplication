import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // New loading state

    const authUrl = `http://localhost:8000/protectedRoutes/authCheck`;

    useEffect(() => {
        axios
            .get(authUrl, { withCredentials: true })
            .then((res) => {
                if (res.data?.status?.toUpperCase() === 'SUCCESS') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch((err) => {
                console.error('Error while checking Auth Status:', err);
                setIsAuthenticated(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
