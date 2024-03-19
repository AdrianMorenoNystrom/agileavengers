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
        <div className="Details">
        <h2>Project Details</h2>
        </div>        
        <ProjectChart project={selectedProject} />
      </div>
    </div>
  );
}

export default Home;
