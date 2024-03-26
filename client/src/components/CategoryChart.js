import React from 'react';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { PiePlot } from '@mui/x-charts/PieChart';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import useFetchTimereports from './useFetchTimereports.js';
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";


const CategoryChart = ({ project }) => {
    const { timereports, isLoading, error } = useFetchTimereports(project?.id);
    console.log(project?.id)
    const hoursWorked = project?.properties?.['Hours Worked']?.rollup?.number || 0;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Calculate hours by category
    const hoursByCategory = {};
    timereports.forEach(report => {
        const category = report?.properties?.Category?.select?.name;
        const hours = report?.properties?.Hours?.number;
        hoursByCategory[category] = (hoursByCategory[category] || 0) + hours;
    });

    // Generate seriesData for each category
    const seriesData = Object.keys(hoursByCategory).map((category, index) => ({
        id: index + 1,
        value: hoursByCategory[category],
        label: category,
        percentage: ((hoursByCategory[category] / hoursWorked) * 100).toFixed(0),
    }));
    return (
        <>
        <h4>Logged work</h4>
            <ResponsiveChartContainer
                series={[
                    {
                        type: 'pie',
                        data: seriesData,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        innerRadius: '60%',
                        outerRadius: '100%',
                        paddingAngle: 2,
                        cornerRadius: 2,
                        startAngle: 0,
                        endAngle: 360,
                    }
                ]}
                height={220}
            >
                <ChartsTooltip trigger='item'/>
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
                                fontSize: 10,
                            },
                        },
                    }}
                />
            </ResponsiveChartContainer>
        </>
    );
};

export default CategoryChart;
