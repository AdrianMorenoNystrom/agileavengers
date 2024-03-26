import React from 'react';
import useFetchTimereports from '../useFetchTimereports';
import { ChevronRight } from 'lucide-react';

function TimeLine({ projectId, filterByUser }) {
    const { timereports, isLoading, error } = useFetchTimereports(projectId, filterByUser);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Sorterar aktiviteterna baserat på datum i fallande ordning
    const sortedActivities = timereports.sort((a, b) => new Date(b.properties.Date.date.start) - new Date(a.properties.Date.date.start));

    // Begränsar antalet aktiviteter till de 3 senaste
    const latestActivities = sortedActivities.slice(0, 3);

    return (
        <div className='activities'>
            <h2>Latest activities</h2>
            <ul>
                {latestActivities.map((timereport, index) => (
                    <li key={index}>
                        <div className='activity'>
                            <time className='date'>{timereport?.properties?.Date?.date?.start}</time>
                            <p className=''>{timereport?.properties?.Name?.rollup?.array[0]?.formula?.string} worked {timereport.properties.Hours?.number} hours</p>
                            <p className='activity-tag'>{timereport?.properties?.Category?.select?.name}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='timeline-bottom'>View all activity <ChevronRight size={14} /></div>
        </div>
    );
}

export default TimeLine;
