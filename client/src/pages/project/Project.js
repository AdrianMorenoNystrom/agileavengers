import React from 'react';
import useFetchData from '../../components/UseFetchData';
import { useParams } from 'react-router-dom';
import dateFormatter from '../../components/functions/dateFormatter';
import GetProjectAvatar from '../../components/TeamAvatars';
import AvatarGroup from '@mui/material/AvatarGroup';
import Chip from '@mui/material/Chip';
import statusCheck from '../../components/functions/statusCheck';
import '../../components/single/single.scss';
import './project.scss';
import TimeLine from '../../components/Timeline/TimeLine';
import DonutChart from '../../components/DonutChart';

function Project() {
    const { id } = useParams();
    console.log(id);

    const { data, isLoading, error } = useFetchData(`/api/projects/project/${id}`, true);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
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
                    <TimeLine projectId={id} />
                    <div className='charts'><DonutChart project={data} /> </div>
                </aside>
                <div className='project-content'>
                </div>
            </div>
        </div>
    );
}

export default Project;