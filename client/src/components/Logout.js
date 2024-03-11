import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, Typography } from "@mui/material";
import AuthContext from "./AuthContext";

const Logout = ({ onClose }) => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate("/api/auth/login");
        onClose();
    };

    return (
        <MenuItem key="Logout" onClick={handleLogout}>
            <Typography textAlign="center">Logout</Typography>
        </MenuItem>
    );
};

export default Logout;