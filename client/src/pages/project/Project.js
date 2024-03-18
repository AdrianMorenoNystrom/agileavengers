import React from 'react';
import useFetchData from '../../components/UseFetchData';
import { useParams } from 'react-router-dom'; 
import dateFormatter from '../../components/DateFormatter';
import GetProjectAvatar from '../../components/GetProjectAvatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ProjectChart from '../../components/ProjectChart'; 
import '../../components/single/single.scss'
import './project.scss'
import statusCheck from '../../components/statusCheck';

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
              <div className='project-heading'>
                {data.properties && (
                <>
                  <div className='topInfo'>
                  <h1>{data?.properties?.Projectname?.title[0]?.plain_text}</h1>
                  <Chip className="status" color={statusCheck(data?.properties?.Status?.select?.name)} size="small" label={data?.properties?.Status?.select?.name || ''} />
                  </div>
                    <div className="project-info">
                        <div className='item'>
                            <div className='itemTitle'>Start date: </div>
                            <div className='itemValue'>{dateFormatter.format(new Date(data?.created_time))}</div>             
                        </div>
                        <div className='item'>
                            <div className='itemTitle'>End date: </div>
                            <div className='itemValue'>{dateFormatter.format(new Date(data?.properties?.Timespan?.date?.end)) || ''}</div>             
                        </div>   
                          <div className='item'>
                              <div className='itemTitle'>Leader: </div>
                              <div className='itemValue'>{data?.properties?.['Project Leader Name']?.rollup?.array?.[0]?.formula?.string || ''}</div>        
                          </div>
                          <div className='item'>
                              <div className='itemTitle'>Team: </div>
                              <div className='itemValue'>
                                <AvatarGroup max={4}>

                                 <GetProjectAvatar />

                                </AvatarGroup></div>             
                          </div>
                          <div className='item'>
                            <div className='itemTitle'>Project info</div>
                            <p className='itemValue'>This is a very important and exciting project
                            where we will do very good stuff for many people and eat lotsa cake.</p>
                          </div>
                    </div>
                    </>
                )}
                </div>
                <div className='activities'>
                  <h2>Latest activities</h2>
                  <ul>
                    <li>
                      <div className='activity'>
                        <time className='date'>20 minutes ago</time>
                        <p className=''>Olof worked 5 hours</p>
                        <p className='activity-tag'>coding</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className='charts'><ProjectChart project={data} /> </div>
                <div className='timeReports'></div>
            </div>
        </div>
    );
}

export default Project;
