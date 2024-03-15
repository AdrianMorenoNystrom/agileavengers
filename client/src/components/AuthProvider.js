import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || isAuthenticated === null) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated);
    }, [isAuthenticated]);

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated,

    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;