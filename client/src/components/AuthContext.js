import { createContext } from "react";

const initialAuthState = {
    isAuthenticated: false,
    setIsAuthenticated: () => { },
};

const AuthContext = createContext(initialAuthState);

export default AuthContext;