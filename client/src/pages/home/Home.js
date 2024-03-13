import React from "react";
import "./home.scss";
import ProjectOverview from "../../components/ProjectOverview";
import ActiveProjects from '../../components/ActiveProjects';

function Home() {
  return (
    <div className="home">
      <div className="box box1">
        <h2>Active projects</h2>
        <ActiveProjects /> { }
      </div>

      <div className="box box2">
        <h2>Users</h2>
        <ProjectOverview />
      </div>
    </div>
  );
}

export default Home;