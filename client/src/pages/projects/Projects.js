import React from 'react';
import './projects.scss';
import ProjectTable from '../../components/ProjectTable';

function Projects() {
  return (
    <div className='projects'>
      <h1>Projects</h1>
      <div className="box box1">
        <ProjectTable />
      </div>
    </div>
  );
}

export default Projects;