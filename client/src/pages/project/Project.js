import React, { useState } from 'react';
import useFetchData from '../../components/UseFetchData';
import { useParams } from 'react-router-dom'; 
import dateFormatter from '../../components/DateFormatter';
import GetProjectAvatar from '../../components/GetProjectAvatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Chip from '@mui/material/Chip';
import ProjectChart from '../../components/ProjectChart'; 
import '../../components/single/single.scss'
import './project.scss'
import statusCheck from '../../components/statusCheck';
import { Pencil } from 'lucide-react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AlertMessage from '../../components/AlertMessage';
import ProjectTimeLine from '../../components/ProjectTimeLine';
import { ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';
import EditHours from '../../components/EditHours';
import EditEndDate from '../../components/EditEndDate';

function Project() {
    const { id } = useParams();
    console.log(id);

    const [isEditingHour, setIsEditingHour] = useState(false); 
    const [isEditingDate, setIsEditingDate] = useState(false); 
    const[enddate, setEndDate] = useState('');
    const [inputNumber, setInputNumber] = useState(''); 
    const [alertMessage, setAlertMessage] = useState({});   


    const handleHourClick = () => {
        setIsEditingHour(true); 
    };

    const handleHourCancel = () => {
        setIsEditingHour(false); 
    };

    const handleDateClick = () => {
        setIsEditingDate(true); 
    };

    const handleDateCancel = () => {
        setIsEditingDate(false); 
    };

    const submitHours = () => {
        console.log("Submitted number:", inputNumber);
        fetch(`/api/projects/changeTime/${id}`, { 
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputNumber }),
            credentials: "include",
        })
        .then(response => {
            if (response.ok) {
                setAlertMessage({
                    message: "Total hours on project updated to: " + inputNumber,
                    severity: "success"
                });
                setInputNumber('');
                setIsEditingHour(false);
            } else {
                console.error('Failed to submit input number');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const submitEndDate = (newEndDate) => {
        const inputDate = new Date(newEndDate);
        const formattedDate = inputDate.toISOString().slice(0, 10);
        fetch(`/api/projects/changeDate/${id}`, { 
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newEndDate: formattedDate }), 
            credentials: "include",
        })
        .then(response => {
            if (response.ok) {
                setAlertMessage({
                    message: "New end date submitted to project: " + newEndDate,
                    severity: "success"
                });
                setEndDate('');
                setIsEditingDate(false);
            } else {
                console.error('Failed to submit new enddate');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

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
    const hoursTotal = properties?.['Total Hours']?.number || 0;
    
    return (
        <div className='single'>
            <div className='project'>
                <div className='project-heading'>
                    <div className='topInfo'>
                        <h1>{projectName}</h1>
                        <AlertMessage
                            open={!!alertMessage.message}
                            onClose={() => setAlertMessage({})}
                            message={alertMessage.message || ""}
                            f
                            severity={alertMessage.severity || ""}
                        />
                        <Chip className="status" color={statusCheck(statusName)} size="small" label={statusName} /><Pencil className="edit" size={12}/>

                    </div>
                    <div className="project-info">
                        <div className='item'>
                            <div className='itemTitle'>Start date: </div>
                            <div className='itemValue'>{dateFormatter.format(startDate)}</div>             
                        </div>
                        <div className='item'>
                            <div className='itemTitle'>End date: <Pencil className="edit" size={12} onClick={handleDateClick}/> </div>
                            <div className='itemValue'>{dateFormatter.format(endDate)}</div>
                            {isEditingDate ? (
                        <EditEndDate
                        currentEndDate={endDate}
                        handleCancel={handleDateCancel}
                        submitEndDate={submitEndDate} 
                    />
                    ) : null}
                        </div>                     
                        <div className='item'>
                            <div className='itemTitle'>Leader: </div>
                            <div className='itemValue'>{leaderName}</div>             
                        </div>
                        <div className='item'>
                    <div className='itemTitle'>Total hours:<Pencil className="edit" onClick={handleHourClick} size={12}/></div>
                    <div className='itemValue'>{hoursTotal}</div>
                    {isEditingHour ? (
                        <EditHours
                            inputNumber={inputNumber}
                            setInputNumber={setInputNumber}
                            handleCancel={handleHourCancel}
                            submitHours={submitHours}
                        />
                    ) : null}
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
                            <li>
                                <div className='activity'>
                                    <time className='date'>20 minutes ago</time>
                                    <p className=''>Olof worked 5 hours</p>
                                    <p className='activity-tag'>coding</p>
                                </div>
                            </li>
                            <li>
                                <div className='activity'>
                                    <time className='date'>20 minutes ago</time>
                                    <p className=''>Olof worked 5 hours</p>
                                    <p className='activity-tag'>coding</p>
                                </div>
                            </li>
                        </ul>
                        <div className='timeline-bottom'>View all activity <ChevronRight size={14} /></div>
                    </div>
                    <div className='charts'><ProjectChart project={data} /> </div>
                </aside>

            </div>
        </div>
    );
}

export default Project;
