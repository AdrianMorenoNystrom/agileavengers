import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Bell } from 'lucide-react';
import useFetchData from "./UseFetchData";
import AuthContext from './AuthContext';
import '../components/navbar/navbar.scss';
import Alert from '@mui/material/Alert';
 
 
 
const NotificationMessage = () => {
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { data: projects, isLoading } = useFetchData("/api/projects");
  const [expiringProjects, setExpiringProjects] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
 
  useEffect(() => {
    if (!isLoading && projects && Array.isArray(projects)) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
 
      const expiringSoon = projects.filter(project => {
        const endDate = new Date(project?.properties?.Timespan?.date?.end);
        endDate.setHours(0, 0, 0, 0);
        const diffDays = (endDate - today) / (1000 * 60 * 60 * 24);
        return diffDays >2 && diffDays <= 5;
      });
 
      const expiringToday = projects.filter(project => {
        const endDate = new Date(project?.properties?.Timespan?.date?.end);
        endDate.setHours(0, 0, 0, 0);
        const diffDays = (endDate - today) / (1000 * 60 * 60 * 24);
        return diffDays <= 1 && diffDays >= 0;
      });
 
      setExpiringProjects([...expiringToday, ...expiringSoon]);
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
        MenuListProps={{
          'aria-labelledby': 'notification-button',
        }}
        sx={{
          mt: 2,
          '.MuiPaper-root': {
          }
        }}
      >
      {expiringProjects.length > 0 ? (
        expiringProjects.map((project) => {
          const endDate = new Date(project.properties.Timespan.date.end);
          const today = new Date();
          const diffTime = Math.abs(endDate - today);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
 
          let alertType = "info";
          if (diffDays <= 1) {
            alertType = "warning";
          }
 
          return (
            <MenuItem
              key={project.id}
              onClick={() => handleProjectSelect(project.id)}
              sx={{
                bgcolor: 'transparent',
                '.MuiTouchRipple-root': {
                  color: 'transparent',
                },
              }}
            >
              <Alert
                severity={alertType}
                sx={{
                  border: 'none',
                  boxShadow: 'none',
                  bgcolor: 'transparent',
                }}
              >
                {project.properties.Projectname.title[0].text.content}: End date {project.properties.Timespan.date.end}
              </Alert>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={handleNotifClose} sx={{ bgcolor: 'transparent' }}>
          <Typography variant="body2" color="textSecondary">No new notifications</Typography>
        </MenuItem>
      )}
    </Menu>
  </>
);
 
};
export default NotificationMessage;