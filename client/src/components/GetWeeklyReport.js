import React from "react";
import useFetchData from "./UseFetchData";
import Box from '@mui/material/Box';
import { BarChart } from "@mui/x-charts";
import GetWeekNumber from '../pages/functions/GetWeekNumber';

const WeeklyReport = ({ projectId }) => {
    const { data, isLoading, error } = useFetchData('/api/timereports/weekly');

    if (isLoading) return (<div>Loading...</div>);
    if (error) return (<div>{error}</div>);

    const selectedProject = data.filter(timereport => timereport?.properties?.Project?.relation?.[0]?.id === projectId);
    const totalHours = selectedProject.reduce(
        (accumulator, timereport) => accumulator + (timereport?.properties?.Hours?.number || 0), 0
    );
    const totalHoursPerPerson = selectedProject.reduce((accumulator, timereport) => {
        const personName = timereport?.properties?.Name?.rollup?.array?.[0]?.formula?.string;
        const hours = timereport?.properties?.Hours?.number || 0;
        accumulator[personName] = (accumulator[personName] || 0) + hours;
        return accumulator;
    }, {});

    const chartData = Object.entries(totalHoursPerPerson).map(([person, hours]) => ({
        data: [hours],
        label: `${person} | ${hours}h`
    }));

    chartData.push({
        data: [totalHours],
        label: `Total Hours | ${totalHours}h`
    });

    return (
        <Box component={'section'}>
            {totalHours !== 0 ? (
                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: 'column' }}>
                    <h4>Hours Reported Last Week</h4>
                    <BarChart
                        margin={{ top: 50, bottom: 50, left: 50, right: 200 }}
                        xAxis={[
                            {
                                scaleType: 'band',
                                data: [`Week ${GetWeekNumber(new Date()) - 1}`],
                                categoryGapRatio: 0.1,
                                barGapRatio: 0.2
                            }
                        ]}
                        series={chartData}
                        width={500}
                        height={300}
                        slotProps={{
                            legend: {
                                direction: 'column',
                                position: { vertical: 'center', horizontal: 'right' },
                                itemMarkHeight: 10,
                                itemMarkWidth: 10,
                                itemGap: 5
                            },
                        }}
                        tooltip={{ trigger: 'item' }}
                    />
                </Box>
            ) : (
                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: 'column' }}>
                    <h4>This project has no hours reported for last week.</h4>
                </Box>
            )}
        </Box>
    );
};

export default WeeklyReport;

// {filteredTimeReports.map((timereport) => (
//     <div key={timereport.id}>
//         {/* <div>{timereport?.properties?.Name?.rollup?.array?.[0]?.formula?.string}</div> */}
//         <div>{timereport?.properties?.Date?.date?.start}</div>
//         {/* <div>{timereport?.properties?.Hours?.number}</div> */}
//         {/* <div>{timereport?.properties?.Category?.select !== null ? timereport?.properties?.Category?.select.name : ''}</div> */}
//     </div>
// ))}