import React, { useState, useEffect } from "react";
import "./home.scss";
import "../../components/Timeline/timeline.scss";
import ActiveProjects from '../../components/ActiveProjects';
import ProjectChart from "../../components/ProjectChart";
import TimeLine from "../../components/Timeline/TimeLine";
import WorkedHours from "../../components/widgets/WorkedHours";
import CategoryChart from "../../components/CategoryChart";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); 


  // Added this because CategoryChart needs to wait for its proper projectId.
  useEffect(() => {
    setIsLoading(!selectedProject);
  }, [selectedProject]);

  const handleClick = () => {
    navigate(`/projects/`);
  };

  const projectStatusHeader = selectedProject
    ? selectedProject.properties.Status.select.name === "Done"
      ? "Most Recently Finished Project"
      : "Active Projects"
    : "Loading...";

  return (
    <div className="home">
      <div className="grid-item landscape">
        <div className="box-headers">
          <h4>{projectStatusHeader}</h4>
          <Chip label="See all" variant="outlined" onClick={handleClick} />
        </div>
        <ActiveProjects onProjectSelect={setSelectedProject} />
      </div>
      <div className="grid-item box"><TimeLine /></div>
      <div className="grid-item box"><h1>Some stuff</h1></div>
      {selectedProject && !isLoading && (
        <div className="grid-item box charts">
          <CategoryChart project={selectedProject} /></div>
      )}
      <div className="grid-item box charts">
        <ProjectChart project={selectedProject} /></div>
      <div className="grid-item landscape"><WorkedHours /></div>
    </div>
  );
}

export default Home;
