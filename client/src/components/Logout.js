import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, Typography } from "@mui/material";
import AuthContext from "./AuthContext";

const Logout = ({ onClose }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:3500/api/auth/logout", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.redirectTo) {
          setIsAuthenticated(false);
          navigate(data.redirectTo);
          onClose();
        }
      })
      .catch((error) => console.error("Error:", error));

    onClose();
  };

  return (
    <MenuItem key="Logout" onClick={handleLogout}>
      <Typography textAlign="center">Logout</Typography>
    </MenuItem>
  );
};

export default Logout;
