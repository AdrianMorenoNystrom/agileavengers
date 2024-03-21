import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Bell } from 'lucide-react';
import useFetchData from "./UseFetchData";
import AuthContext from './AuthContext';
import '../components/navbar/navbar.scss';
 
 
const NotificationMessage = () => {
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { data: projects, isLoading } = useFetchData("/api/projects");
  const [expiringProjects, setExpiringProjects] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
 
  useEffect(() => {
    if (!isLoading && projects && Array.isArray(projects)) {
      const today = new Date();
      const expiring = projects.filter(project => {
        const endDate = new Date(project?.properties?.Timespan?.date?.end);
        const diffTime = Math.abs(endDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 1;
      });
      setExpiringProjects(expiring);
    } else {
      setExpiringProjects([]);
    }
  }, [projects, isLoading]);
 
  const handleNotifClick = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };
 
  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };
 
  const handleProjectSelect = (projectId) => {
    navigate(`/projects/${projectId}`);
    handleNotifClose();
  };
 
  // Använder isAuthenticated för att kontrollera om innehållet ska visas.Visas annars överallt.
  if (!isAuthenticated) return null;
 
  return (
    <>
      <div onClick={handleNotifClick}>
        <Bell size={20} />
        {expiringProjects.length > 0 && <span className="notification-count">{expiringProjects.length}</span>}
      </div>
      <Menu
        id="notif-menu"
        anchorEl={notifAnchorEl}
        open={Boolean(notifAnchorEl)}
        onClose={handleNotifClose}
        MenuListProps={{ 'aria-labelledby': 'notification-button', }}
      >
        {expiringProjects.length > 0 ? (
          expiringProjects.map((project) => (
            <MenuItem key={project.id} onClick={() => handleProjectSelect(project.id)}>
              {project.properties.Projectname.title[0].text.content}: End date {project.properties.Timespan.date.end}
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleNotifClose}>
            <Typography variant="body2" color="textSecondary">No new notifications</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
 
export default NotificationMessage;