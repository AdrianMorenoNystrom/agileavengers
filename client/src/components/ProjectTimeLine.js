// ProjectTimeLine.js
import React from 'react';
import useFetchTimereports from './useFetchTimereports';
import { ChevronRight } from 'lucide-react';

function ProjectTimeLine({ projectId }) {
    const { timereports, isLoading, error } = useFetchTimereports(projectId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='activities'>
            <h2>Latest activities</h2>
            <ul>
                {timereports && timereports.map((timereport, index) => (
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

export default ProjectTimeLine;
