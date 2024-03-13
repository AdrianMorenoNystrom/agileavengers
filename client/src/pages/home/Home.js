import React from "react";
import "./home.scss";
import ActiveProjects from '../../components/ActiveProjects';
import GetPeopleNew from "../../components/getpeople/GetPeople";

function Home() {
  return (
    <div className="home">
      <div className="box box1">
        <h2>Active projects</h2>
        <ActiveProjects />
      </div>

      <div className="box box2">
        <h2>Users</h2>
        <GetPeopleNew />
      </div>
    </div>
  );
}

export default Home;