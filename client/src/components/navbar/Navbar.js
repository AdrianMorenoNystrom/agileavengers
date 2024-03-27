import React, { useState } from 'react';
import "./navbar.scss";
import { Rocket } from 'lucide-react';
import Menu from '@mui/material/Menu';
import Logout from "../Logout";
import GetAvatar from "../UserAvatar";
import NotificationMessage from "../Notification";
import { Chip } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    navigate(`/new/timereport`);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Rocket size={20} />
        <span>Agile Avengers</span>
        <Chip label="Report time" variant="outlined" icon={<EventAvailableIcon />} onClick={handleClick} sx={{marginLeft:5}}/>
      </div>
      <div className="icons">
        <NotificationMessage />
        <div className="user" onClick={handleProfileClick}>
          <GetAvatar />
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <Logout onClose={handleClose} />
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
