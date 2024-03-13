import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useFetchData from './UseFetchData';

function createData(project) {
    return {
        name: project?.properties?.Projectname?.title?.[0]?.text?.content,
        status: project?.properties?.Status?.select?.name,
        totalHoursPlanned: project?.properties?.['Total Hours']?.number,
        hoursWorked: project?.properties?.['Hours Worked']?.rollup?.number,
        hoursRemaining: project?.properties?.['Hours Left']?.formula?.number,
        information: [
            {
                projectLeader: project?.properties?.['Project Leader Name']?.rollup?.array?.[0]?.formula?.string,
                teamMembers: project?.properties?.['Team Members']?.rollup?.array
                    ?.map((teamMember) => teamMember?.formula?.string)
                    .join(', '),
                startDate: project?.properties?.Timespan?.date?.start,
                endDate: project?.properties?.Timespan?.date?.end,
            },
        ],
    };
}

function Row(props) {
    const { row, open, onToggle } = props;

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={onToggle}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.totalHoursPlanned}</TableCell>
                <TableCell align="right">{row.hoursWorked}</TableCell>
                <TableCell align="right">{row.hoursRemaining}</TableCell>
                <TableCell>{<VisibilityIcon fontSize='small' />}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Project Information
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left'>Project Leader</TableCell>
                                        <TableCell align='left'>Team Members</TableCell>
                                        <TableCell align='left'>Start Date</TableCell>
                                        <TableCell align='left'>End Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.information.map((informationRow, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{informationRow.projectLeader}</TableCell>
                                            <TableCell>{informationRow.teamMembers}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {informationRow.startDate}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {informationRow.endDate}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        totalHoursPlanned: PropTypes.number.isRequired,
        hoursWorked: PropTypes.number.isRequired,
        hoursRemaining: PropTypes.number.isRequired,
        information: PropTypes.arrayOf(
            PropTypes.shape({
                projectLeader: PropTypes.string.isRequired,
                teamMembers: PropTypes.string.isRequired,
                startDate: PropTypes.string.isRequired,
                endDate: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default function GetProjects() {
    const { data: projectData, isLoading, error } = useFetchData('/api/projects');
    const [openRow, setOpenRow] = useState(null);

    const handleToggle = (index) => {
        setOpenRow(openRow === index ? null : index);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const rows = projectData.map((project) => createData(project));

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Project</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Total Hours Planned</TableCell>
                        <TableCell align="right">Hours Worked</TableCell>
                        <TableCell align="right">Hours Remaining</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <Row key={index} row={row} open={index === openRow} onToggle={() => handleToggle(index)} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}