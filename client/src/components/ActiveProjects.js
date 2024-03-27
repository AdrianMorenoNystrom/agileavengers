import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMediaQuery } from '@mui/material';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingContext from './functions/LoadingContext';
import useFetchData from './UseFetchData';

export default function ActiveProjects({ onProjectSelect }) {
    const { data, isLoading, error } = useFetchData('/api/projects/active');
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:768px)');

    useEffect(() => {
        if (data && data.length > 0) {
            onProjectSelect(data[0]);
            setSelectedProjectId(data[0].id);
        }
    }, [data, onProjectSelect]);

    if (isLoading) return <LoadingContext/>;
    if (error) return <div>{error}</div>;

    // Slice the data array to get only the first 3 projects
    const slicedData = data.slice(0, 3);

    const handleRowClick = (project) => {
        onProjectSelect(project);
        setSelectedProjectId(project.id);
    };

    const handleOpenButtonClick = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    return (
            <Table size={isMobile ? "small" : "medium"} aria-label="active projects table">
            <TableHead>
                <TableRow>
                    <TableCell>Open</TableCell>
                    <TableCell>Project</TableCell>
                    {!isMobile && <TableCell align="right">Leader</TableCell>}
                    {<TableCell align="right">Deadline</TableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {slicedData.map((project) => (
                    <TableRow
                        key={project.id}
                        onClick={() => handleRowClick(project)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: project.id === selectedProjectId ? '#e6e5e5' : 'transparent',
                        }}
                    >
                        <TableCell>
                            <ExternalLink
                                size={18}
                                onClick={() => handleOpenButtonClick(project.id)}
                            />
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {project?.properties?.Projectname?.title?.[0]?.text?.content}
                        </TableCell>
                        {!isMobile && (
                            <TableCell align="right">
                                {project?.properties?.['Project Leader Name']?.rollup?.array?.[0]?.formula?.string || "N/A"}
                            </TableCell>
                        )}
                            <TableCell align="right">
                                {project?.properties?.Timespan?.date?.end || "N/A"}
                            </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
