import { createContext } from "react";

const initialAuthState = {
    isAuthenticated: true,
    setIsAuthenticated: () => { },
};

const AuthContext = createContext(initialAuthState);

export default AuthContext;