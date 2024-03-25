import React, { useState } from "react";
import "./home.scss";
import "../../components/Timeline/timeline.scss";
import ActiveProjects from '../../components/ActiveProjects';
import ProjectChart from "../../components/ProjectChart";
import TimeLine from "../../components/Timeline/TimeLine";
import WorkedHours from "../../components/widgets/WorkedHours";
import DonutChart from "../../components/DonutChart";


function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

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
      <div className="grid-item box"><DonutChart project={selectedProject} /></div>
      <div className="grid-item box"><ProjectChart project={selectedProject} /></div>
      <div className="grid-item landscape"><WorkedHours /></div>
    </div>
  );
}

export default Home;
