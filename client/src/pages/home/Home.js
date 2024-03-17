import React, { useState } from "react";
import "./home.scss";
import ActiveProjects from '../../components/ActiveProjects';
import ProjectChart from "../../components/ProjectChart";
import DataTable from "../../components/datatable/DataTable";

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
        <h2>Project Details</h2>
        <ProjectChart project={selectedProject} />
      </div>

      <div className="box box2">
       
      </div>

      <div className="box box3">
        <h2>Open single</h2>
        <DataTable /> 
      </div>      
    </div>
  );
}

export default Home;
