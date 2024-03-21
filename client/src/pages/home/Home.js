import React, { useState } from "react";
import "./home.scss";
import "../../components/Timeline/timeline.scss";
import ActiveProjects from '../../components/ActiveProjects';
import ProjectChart from "../../components/ProjectChart";
import TotalHours from "../../components/widgets/TotalHours";
import DonutChart from "../../components/DonutChart";
import ProjectTimeLine from "../../components/ProjectTimeLine";
import WorkedHours from "../../components/widgets/WorkedHours";


function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projectStatusHeader = selectedProject
    ? selectedProject.properties.Status.select.name === "Done"
      ? "Most Recently Finished Project"
      : "Active Projects"
    : "Loading...";

  return (
    <div className="home">
      <div className="box box1">
       <h2>{projectStatusHeader}</h2>
        <ActiveProjects onProjectSelect={setSelectedProject} />    
        <ProjectChart project={selectedProject} />
      </div>
      <div className="box widgets"><TotalHours /></div>
      <div className="box portrait"><ProjectTimeLine projectId={selectedProject}/></div>
      <div className="box widgets">Data</div>
      <div className="box landscape"><WorkedHours /></div>
      
    </div>
  );
}

export default Home;
