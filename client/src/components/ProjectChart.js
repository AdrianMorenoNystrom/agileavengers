import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const ProjectChart = ({ project }) => {
    const hoursWorked = project?.properties?.['Hours Worked']?.rollup?.number || 0;
    const hoursLeft = project?.properties?.['Hours Left']?.formula?.number || 0;
    const totalHours = hoursWorked + hoursLeft;
  
    const seriesData = [
        { id: 2, value: hoursWorked, label: 'Hours Worked', percentage: (hoursWorked / totalHours * 100).toFixed(0) },
        { id: 3, value: hoursLeft, label: 'Hours Left', percentage: (hoursLeft / totalHours * 100).toFixed(0) },
    ];

    return (
        <>
            <div>Total Hours: {totalHours}</div>
            <PieChart
                series={[{
                    data: seriesData,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    arcLabel: ({ percentage }) => `${percentage}%`,
                }]}
                width={400}
                height={200}
            />
        </>
    );
};

export default ProjectChart;
