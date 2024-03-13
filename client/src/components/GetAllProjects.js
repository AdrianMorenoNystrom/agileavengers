import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useFetchData from "./UseFetchData";

const GetAllProjects = () => {
    const { data: projectData, isLoading, error } = useFetchData('/api/projects');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Table aria-label="projects table">
            <TableHead>
                <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Project Leader</TableCell>
                    <TableCell>Team Members</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Total Hours Planned</TableCell>
                    <TableCell>Hours Worked</TableCell>
                    <TableCell>Hours Remaining</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {projectData && projectData.map((project) => (
                    <TableRow key={project.id} sx={{ opacity: project?.properties?.Status?.select?.name !== 'Active' ? 0.8 : 1 }}>
                        <TableCell component="th" scope="row">
                            {project?.properties?.Projectname?.title?.[0]?.text?.content}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {project?.properties?.Status?.select?.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {project?.properties?.['Project Leader Name']?.rollup?.array?.[0]?.formula?.string}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {project?.properties?.['Team Members']?.rollup?.array?.map((teamMember, index) => (
                                <span key={index}>
                                    {teamMember?.formula?.string}
                                    {index < project.properties['Team Members']?.rollup?.array?.length - 1 && ', '}
                                </span>
                            ))}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {project?.properties?.Timespan?.date?.start}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {project?.properties?.Timespan?.date?.end}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {project?.properties?.['Total Hours']?.number}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {project?.properties?.['Hours Worked']?.rollup?.number}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {project?.properties?.['Hours Left']?.formula?.number}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default GetAllProjects;