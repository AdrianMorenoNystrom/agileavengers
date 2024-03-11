import React from "react";
import "./home.scss";
import GetPeopleNew from '../../components/GetPeopleNew'
import GetProjects from '../../components/GetProjects';

function Home() {
  return (
    <div className="home">
      
      <div className="box box1">
      <h2>Projects</h2>
      </div>

      <div className="box box2"><h2>Recent</h2></div>
      
      <div className="box box3"><h2>Todo</h2></div>

      <div className="box box4">
      <h2>Some data</h2>
      </div>

      <div className="box box5">
        <h2>Users</h2>
        <GetPeopleNew />
      </div>
      <div className="box box6">
      <h2>Charts</h2>
      </div>

      <div className="box box7">
      <h2>More Charts</h2>
      </div>

    </div>
  )
}

export default Home