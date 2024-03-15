import React from 'react';
import '../../components/single/single.scss';
import useFetchData from '../../components/UseFetchData';
import { useParams } from 'react-router-dom'; 

function Project() {
  const { id } = useParams();
  console.log(id); 

  const { data, isLoading, error } = useFetchData(`/api/projects/project/${id}`, true);

  if (isLoading) return <div>Laddar...</div>;
  if (error) return <div>Fel vid hämtning av data: {error}</div>;

  if (!data) return <div>No data available</div>;

  return (
    <div className='single'>
      <div className='project'>
        {data.properties && (
          <div className="project-info">
            <div>{data?.created_time}</div> 
            <div>{data?.properties?.Projectname?.title[0]?.plain_text}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;
