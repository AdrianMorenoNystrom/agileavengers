import React, { useState } from "react";
import "./navbar.scss";
import { Settings, Rocket } from 'lucide-react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from "../Logout";
import GetAvatar from "../UserAvatar";
import NotificationMessage from "../Notification";
 
 
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  return (
    <div className="navbar">
      <div className="logo">
        <Rocket size={20} />
        <span>Agile Avengers</span>
      </div>
      <div className="icons">
        <NotificationMessage />
        <Settings className="icon" size={20} />
        <div className="user" onClick={handleClick}>
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
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <Logout onClose={handleClose} />
        </Menu>
      </div>
    </div>
  );
};
 
export default Navbar;
 