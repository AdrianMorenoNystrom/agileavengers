import React from 'react';
import useFetchTimereports from './useFetchTimereports';
import { ChevronRight } from 'lucide-react';

function ProjectTimeLine({ projectId }) {
    const { data, isLoading, error } = useFetchTimereports(projectId);
    console.log(data);

    if (isLoading) return <div>Laddar...</div>;
    if (error) return <div>Fel vid hämtning av data: {error}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <div className='activities'>
            <h2>Latest activities</h2>
            <ul>
                {data && data.map((timereport, index) => (
                    <li key={index}>
                        <div className='activity'>
                            <time className='date'>{data?.properties?.Date?.date?.start}</time>
                            <p className=''>{data?.properties?.Name?.rollup?.array[0]?.formula?.string} worked {timereport.properties.Hours?.number} hours</p>
                            <p className='activity-tag'>{data?.properties?.Category?.select?.name}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='timeline-bottom'>View all activity <ChevronRight size={14} /></div>
        </div>
    );
}

export default ProjectTimeLine;
