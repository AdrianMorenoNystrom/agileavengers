import React, { useState } from "react";
import "./navbar.scss";
import { Settings } from 'lucide-react';
import { Bell } from 'lucide-react';
import { Rocket } from 'lucide-react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from "../Logout";


const Navbar = ({ setIsAuthenticated }) => {
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
        <Rocket size={20}/>
        <span>Agile Avengers</span>
      </div>
      <div className="icons">
        <div className="notification">
          <Bell className="icons" size={20}/>
          <span>1</span>
        </div>
        <Settings className="icon" size={20}/>
        <div className="user" onClick={handleClick}>
          <span>UserName</span>
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
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
          <Logout onClose={handleClose} setIsAuthenticated={setIsAuthenticated} />
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
