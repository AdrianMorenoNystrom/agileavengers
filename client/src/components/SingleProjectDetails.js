import React from 'react';
import useFetchDataSingle from './UseFetchDataSingle';

export default function SingleProjectDetails() {
    const { data, isLoading, error } = useFetchDataSingle('/api/projects/project');

    if (isLoading) return <div>Laddar...</div>;
    if (error) return <div>Fel vid hämtning av data: {error}</div>;

    if (!data) return <div>No data available</div>;

    return (
        <>
            {data.properties && (
                <div className="info">
                    <div>{data?.created_time}</div> 
                    <div>{data?.properties?.Projectname?.title[0]?.plain_text}</div>
                </div>
            )}
        </>
    );
}


