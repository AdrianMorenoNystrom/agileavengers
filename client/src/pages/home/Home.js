import React, { useState } from "react";
import "./home.scss";
import ActiveProjects from '../../components/ActiveProjects';
import ProjectChart from "../../components/ProjectChart";
import DataTable from "../../components/datatable/DataTable";

function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="home">
      <div className="box box1">
        <h2>Active projects</h2>
        <ActiveProjects onProjectSelect={handleProjectSelect} />
      </div>

      <div className="box box2">
        <h2>Project Details</h2>
        {selectedProject && <ProjectChart project={selectedProject} />}
      </div>

      <div className="box box3">
        <h2>Open single</h2>
        <DataTable /> 
      </div>      
    </div>
  );
}

export default Home;
