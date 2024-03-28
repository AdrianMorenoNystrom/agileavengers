import React from "react";
import useFetchData from "./UseFetchData";
import { BarChart } from "@mui/x-charts";
import getWeekNumber from "./functions/getWeekNumber";
import "../pages/projects/projects.scss";
import { formatTime } from "./functions/timeFormatter";
import LoadingContext from './functions/LoadingContext';
import WidgetTagger from "../components/widgets/widgetTagger";

const WeeklyReport = ({ projectId }) => {
  const { data, isLoading, error } = useFetchData("/api/timereports/weekly");

  if (isLoading) return <LoadingContext />;
  if (error) return <div>{error}</div>;

  const selectedProject = data.filter(
    (timereport) =>
      timereport?.properties?.Project?.relation?.[0]?.id === projectId
  );
  const totalHours = selectedProject.reduce(
    (accumulator, timereport) =>
      accumulator + (timereport?.properties?.Hours?.number || 0),
    0
  );
  const totalHoursPerPerson = selectedProject.reduce(
    (accumulator, timereport) => {
      const personName =
        timereport?.properties?.Name?.rollup?.array?.[0]?.formula?.string;
      const hours = timereport?.properties?.Hours?.number || 0;
      accumulator[personName] = (accumulator[personName] || 0) + hours;
      return accumulator;
    },
    {}
  );

  const chartData = Object.entries(totalHoursPerPerson).map(
    ([person, hours]) => ({
      data: [hours],
      label: `${person} | ${formatTime(hours, true)}`,
    })
  );

  chartData.push({
    data: [totalHours],
    label: `Total Hours | ${formatTime(totalHours, true)}`,
  });

  return (
    <>
      {totalHours !== 0 ? (
        <div className="project-graph">
          <div style={{marginBottom:"1em"}} className="box-headers">
            <h4>Hours reported last week</h4>
            <WidgetTagger projectId={projectId}/>
          </div>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: [`Week ${getWeekNumber(new Date()) - 1}`],
                categoryGapRatio: 0.1,
                barGapRatio: 0.2,
              },
            ]}
            series={chartData}
            height={280}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'top', horizontal: 'middle' },
                padding: 0,
                itemMarkWidth: 5,
                itemMarkHeight: 5,
                markGap: 5,
                itemGap: 10,
                labelStyle: {
                  fontSize: 12,
                },
              },
            }}
            tooltip={{ trigger: "item" }}
            
          />
        </div>
      ) : (
        <div className="project-title">
          <h4>This project has no hours reported for last week</h4>
        </div>
      )}
    </>
  );
};

export default WeeklyReport;
