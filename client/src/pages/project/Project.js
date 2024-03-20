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
import { ChevronRight } from 'lucide-react';
import ProjectTimeLine from '../../components/ProjectTimeLine';
 
function Project() {
    const { id } = useParams();
    console.log(id);
 
    const { data, isLoading, error } = useFetchData(`/api/projects/project/${id}`, true);
 
    if (isLoading) return <div>Laddar...</div>;
    if (error) return <div>Fel vid hämtning av data: {error}</div>;
    if (!data) return <div>No data available</div>;
    const properties = data.properties;
    const projectName = properties?.Projectname?.title[0]?.plain_text || '';
    const statusName = properties?.Status?.select?.name || '';
    const startDate = new Date(data.created_time);
    const endDate = new Date(properties?.Timespan?.date?.end);
    const leaderName = properties?.['Project Leader Name']?.rollup?.array?.[0]?.formula?.string || '';
   
    return (
        <div className='single'>
            <div className='project'>
                <div className='project-heading'>
                            <div className='topInfo'>
                                <h1>{projectName}</h1>
                                <Chip className="status" color={statusCheck(statusName)} size="small" label={statusName} />
                            </div>
                            <div className="project-info">
                                <div className='item'>
                                    <div className='itemTitle'>Start date: </div>
                                    <div className='itemValue'>{dateFormatter.format(startDate)}</div>            
                                </div>
                                <div className='item'>
                                    <div className='itemTitle'>End date: </div>
                                    <div className='itemValue'>{dateFormatter.format(endDate) || ''}</div>            
                                </div>  
                                <div className='item'>
                                    <div className='itemTitle'>Leader: </div>
                                    <div className='itemValue'>{leaderName}</div>            
                                </div>
                                <div className='item'>
                                    <div className='itemTitle'>Team: </div>
                                    <div className='itemValue'>
                                        <AvatarGroup max={4}>
                                            <GetProjectAvatar />
                                        </AvatarGroup>
                                    </div>            
                                </div>
                                <div className='item'>
                                    <div className='itemTitle'>Project info</div>
                                    <p className='itemValue'>This is a very important and exciting project where we will do very good stuff for many people and eat lotsa cake.</p>
                                </div>
                            </div>
                </div>
                <aside>
                <ProjectTimeLine project_id={id} />
                <div className='charts'><ProjectChart project={data} /> </div>
                </aside>
 
                <div className='project-content'>
                </div>
            </div>
        </div>
    );
}
 
export default Project;