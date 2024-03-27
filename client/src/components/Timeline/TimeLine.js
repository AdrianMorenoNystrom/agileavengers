import React from 'react';
import useFetchTimereports from '../useFetchTimereports';
import { ChevronRight, MoveRight } from 'lucide-react';
import { formatTime } from '../functions/timeFormatter';
import LoadingContext from '../functions/LoadingContext';

function TimeLine({ projectId, filterByUser }) {
    const { timereports, isLoading, error } = useFetchTimereports(projectId, filterByUser);

    if (isLoading) {
        return <LoadingContext />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Sorterar aktiviteterna baserat på datum i fallande ordning
    const sortedActivities = timereports.sort((a, b) => new Date(b.properties.Date.date.start) - new Date(a.properties.Date.date.start));

    // Begränsar antalet aktiviteter till de 3 senaste
    const latestActivities = sortedActivities.slice(0, 3);

    return (
        <>
        <h4 className='box-headers add-margin'>Latest activities</h4>
        <div className='activities'>
            <ul>
                {latestActivities.map((timereport, index) => (
                    <li key={index}>
                        <div className='activity'>
                            <time className='date'>{timereport?.properties?.Date?.date?.start}</time>
                            <p className=''>{timereport?.properties?.Name?.rollup?.array[0]?.formula?.string} worked {formatTime(timereport.properties.Hours?.number)}</p>
                            <div className='activity-details'>
                                <span className='activity-tag'>{timereport?.properties?.Category?.select?.name}</span>
                                {!projectId && (
                                    <>
                                        <MoveRight size={12}/> 
                                        <span className='project-name'>{timereport?.properties?.['Project Name']?.rollup?.array[0]?.title[0]?.text?.content}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <a href='/timereports/all-history'><div className='timeline-bottom'>View all activity <ChevronRight size={14} /></div></a>
        </div>
        </>
    );
}

export default TimeLine;
