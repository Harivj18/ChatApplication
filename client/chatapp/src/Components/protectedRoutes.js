import React, { useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const isAuthenticated = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoutes;
