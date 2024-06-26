import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as CreateMenu, MenuItem } from '@mui/material';
import './sidebar.scss';
import { menuData } from '../../menuData';
import { LayoutDashboard, NotepadText, Users, CalendarCheck, SmilePlus, History, FileClock, SquarePlus, ClipboardList } from 'lucide-react';
import { Menu as MenuIcon } from 'lucide-react';
import { useMediaQuery } from '@mui/material';


const SideBar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(isMobile);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="mobileMenu" >
        <MenuIcon size={20} onClick={toggleSidebar} />
      </div>
      <div className={`sideBarContainer ${isSidebarOpen || !isMobile ? 'open' : ''}`}>
        <div className={`sidebar ${isSidebarOpen || !isMobile ? 'open' : ''}`}>
          {menuData.map((item) => (
            <div className="item" key={item.id}>
              <span className="title">{item.title}</span>
              {item.listItems.map((listItem) => (
                <div key={listItem.id}>
                  {listItem.title === "Create" ? (
                    <div onClick={handleClick} className='listItem'>
                      <SquarePlus size={20} /> <span className='listItemTitle'>Create</span>
                    </div>
                  ) : (
                    <Link to={listItem.url} className="listItem" onClick={handleLinkClick}>
                      {listItem.title === "Dashboard" && <LayoutDashboard size={20} />}
                      {listItem.title === "Projects" && <NotepadText size={20} />}
                      {listItem.title === "Users" && <Users size={20} />}
                      {listItem.title === "My History" && <History size={20} />}
                      {listItem.title === "All History" && <FileClock size={20} />}
                      <span className="listItemTitle">{listItem.title}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
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
              <Link to="/new/timereport" onClick={handleLinkClick}>
                <div className="menu-list-item"><CalendarCheck size={18} /> New Time Report</div>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/new/project" onClick={handleLinkClick}>
                <div className="menu-list-item"><ClipboardList size={18} /> New Project</div>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/adduser" onClick={handleLinkClick}>
                <div className="menu-list-item"><SmilePlus size={18} /> New User</div>
              </Link>
            </MenuItem>
          </CreateMenu>
        </div>
      </div>
    </>
  );
};

export default SideBar;
