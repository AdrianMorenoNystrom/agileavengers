import React from "react";
import "./home.scss";
import GetPeopleNew from '../../components/getpeople/GetPeople'
import ActiveProjects from '../../components/ActiveProjects';
import DataTable from "../../components/datatable/DataTable";

function Home() {
  return (
    <div className="home">      
      <div className="box box1">
      <h2>Active projects</h2>
      <ActiveProjects /> {}
      </div>

      <div className="box box2">
        <h2>Users</h2>
        <GetPeopleNew />
      </div>

      <div className="box box3">
        <h2>DataTable</h2>
        <DataTable /> 
      </div>      
    </div>
  )
}

export default Home