import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const PrivateRoutes = ({ element, ...props }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoutes;