import './workedhours.scss';
import useFetchTimereports from '../useFetchTimereports';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

function WorkedHours() {
  const { timereports, isLoading, error } = useFetchTimereports();
  const [hoursWeek, setHoursWeek] = useState(0);
  const [hoursMonth, setHoursMonth] = useState(0);
  const [hoursYear, setHoursYear] = useState(0);

  useEffect(() => {
    if (!isLoading && !error && timereports) {
      const now = dayjs();

      // Filter timereports for each period and sum up hours
      const hoursThisWeek = timereports.reduce((total, report) => {
        const reportDate = dayjs(report.properties.Date.date.start);
        if (reportDate.isBetween(now.startOf('week'), now.endOf('week'), null, '[]')) {
          return total + report.properties.Hours.number;
        }
        return total;
      }, 0);

      const hoursThisMonth = timereports.reduce((total, report) => {
        const reportDate = dayjs(report.properties.Date.date.start);
        if (reportDate.isBetween(now.startOf('month'), now.endOf('month'), null, '[]')) {
          return total + report.properties.Hours.number;
        }
        return total;
      }, 0);

      const hoursThisYear = timereports.reduce((total, report) => {
        const reportDate = dayjs(report.properties.Date.date.start);
        if (reportDate.isBetween(now.startOf('year'), now.endOf('year'), null, '[]')) {
          return total + report.properties.Hours.number;
        }
        return total;
      }, 0);

      // Remove decimals for dashboard display (rounded down)
      setHoursWeek(Math.floor(hoursThisWeek));
      setHoursMonth(Math.floor(hoursThisMonth));
      setHoursYear(Math.floor(hoursThisYear));
    }
  }, [isLoading, error, timereports]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h4>Logged hours</h4>
      <div className='worked-hours'>
        {[
          { title: 'week', hours: hoursWeek },
          { title: 'month', hours: hoursMonth },
          { title: 'year', hours: hoursYear }
        ].map((item, index) => (
          <div className='worked-container' key={index}>
            <div className='widget-titles'>
              <p className='widget-title'>{item.title}</p>
            </div>
            <p className='widget-result'>{item.hours}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default WorkedHours;
