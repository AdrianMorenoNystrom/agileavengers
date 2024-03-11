import { useState, useEffect } from "react";
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(process.env.AUTH_KEY) === 'true');

    useEffect(() => {
        localStorage.setItem(process.env.AUTH_KEY, isAuthenticated);
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