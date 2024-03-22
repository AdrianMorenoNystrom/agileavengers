import React from 'react';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { PiePlot } from '@mui/x-charts/PieChart';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';

const ProjectChart = ({ project }) => {
    const hoursWorked = project?.properties?.['Hours Worked']?.rollup?.number || 0;
    const hoursLeft = project?.properties?.['Hours Left']?.formula?.number || 0;
    const totalHours = hoursWorked + hoursLeft;
  
    const seriesData = [
        { id: 2, value: hoursWorked, label: 'Hours Worked', percentage: (hoursWorked / totalHours * 100).toFixed(0) },
        { id: 3, value: hoursLeft, label: 'Hours Left', percentage: (hoursLeft / totalHours * 100).toFixed(0) },
    ];

    return (
            <ResponsiveChartContainer
                series={[
                    {
                        type: 'pie',
                        data: seriesData,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        // faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        innerRadius: '60%',
                        outerRadius: '100%',
                        paddingAngle: 2,
                        cornerRadius: 2,
                        startAngle: 0,
                        endAngle: 360,
                    }
                ]}
                height={250}
            >
                <PiePlot />
                <ChartsLegend 
                    slotProps={{
                        legend: {
                          direction: 'row',
                          position: { vertical: 'bottom', horizontal: 'middle' },
                          padding: 0,
                          itemMarkWidth: 5,
                          itemMarkHeight: 5,
                          markGap: 5,
                          itemGap: 10,
                          labelStyle: {
                            fontSize: 14,
                          },

                        },
                      }}
                     />
            </ResponsiveChartContainer>
    );
};

export default ProjectChart;
