import React from 'react';
import { Container } from '@mui/material';
import './projects.scss';
import ProjectTable from '../../components/ProjectTable';

function Projects() {
  return (
    <Container className='projects'>
      <ProjectTable />
    </Container>
  );
}

export default Projects;