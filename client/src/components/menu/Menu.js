import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as CreateMenu, MenuItem } from '@mui/material';
import './menu.scss';
import { menuData } from '../../menuData';
import { LayoutDashboard, NotepadText, Users, CalendarCheck, SmilePlus, History, FileClock, SquarePlus, ClipboardList } from 'lucide-react';

const Menu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="menu">
      {menuData.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <div key={listItem.id}>
              {listItem.title === "Create" ? (
                <div onClick={handleClick} className='listItem'>
                  <SquarePlus size={20} /> Create
                </div>
              ) : (
                <Link to={listItem.url} className="listItem">
                  {listItem.title === "Dashboard" && <LayoutDashboard size={20} />}
                  {listItem.title === "Projects" && <NotepadText size={20} />}
                  {listItem.title === "Users" && <Users size={20} />}
                  {listItem.title === "My History" && <History size={20} />}
                  {listItem.title === "All History" && <FileClock size={20} />}
                  <span className="listItemTitle">{listItem.title}</span>
                </Link>
              )}
              <CreateMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/new/timereport" >
                    <div className="menu-list-item"><CalendarCheck size={18} /> New Time Report</div>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/new/project">
                    <div className="menu-list-item"><ClipboardList size={18} /> New Project</div>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/adduser">
                    <div className="menu-list-item"><SmilePlus size={18} /> New User</div>
                  </Link>
                </MenuItem>
              </CreateMenu>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
