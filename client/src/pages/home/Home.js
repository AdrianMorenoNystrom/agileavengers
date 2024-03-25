import React, { useState, useEffect } from "react";
import "./home.scss";
import "../../components/Timeline/timeline.scss";
import ActiveProjects from '../../components/ActiveProjects';
import ProjectChart from "../../components/ProjectChart";
import TimeLine from "../../components/Timeline/TimeLine";
import WorkedHours from "../../components/widgets/WorkedHours";
import CategoryChart from "../../components/CategoryChart";


function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Added this because CategoryChart needs to wait for its proper projectId.
  useEffect(() => {
    setIsLoading(!selectedProject);
  }, [selectedProject]);

  const projectStatusHeader = selectedProject
    ? selectedProject.properties.Status.select.name === "Done"
      ? "Most Recently Finished Project"
      : "Active Projects"
    : "Loading...";

  return (
    <div className="home">
      <div className="grid-item landscape">
        <h4>{projectStatusHeader}</h4>
        <ActiveProjects onProjectSelect={setSelectedProject} />
      </div>
      <div className="grid-item box"><h1>Some stuff</h1></div>
      <div className="grid-item box"><TimeLine /></div>
      {selectedProject && !isLoading && (
        <div className="grid-item box"><CategoryChart project={selectedProject} /></div>
      )}
      <div className="grid-item box"><ProjectChart project={selectedProject} /></div>
      <div className="grid-item landscape"><WorkedHours /></div>
    </div>
  );
}

export default Home;
