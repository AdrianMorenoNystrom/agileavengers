import { useNavigate } from "react-router-dom";
import { MenuItem, Typography } from "@mui/material";

const Logout = ({ onClose, setIsAuthenticated }) => {
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