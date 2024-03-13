import React from 'react';
import './projects.scss';
import GetAllProjects from '../../components/GetAllProjects';
import TestProjects from '../../components/TestProjects';

function Projects() {
  return (
    <div className='projects'>
      <h1>Projects</h1>
      <div className="box box1">
        <GetAllProjects />
        {/* <TestProjects /> */}
      </div>
    </div>
  );
}

export default Projects;