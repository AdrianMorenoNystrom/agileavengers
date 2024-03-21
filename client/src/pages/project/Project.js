import React, { useState } from 'react';
import useFetchData from '../../components/UseFetchData';
import { Form, useParams } from 'react-router-dom'; 
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

function Project() {
    const { id } = useParams();
    console.log(id);

    const [isEditing, setIsEditing] = useState(false); 
    const [inputNumber, setInputNumber] = useState(''); 
    const [alertMessage, setAlertMessage] = useState({});

    const handleClick = () => {
        setIsEditing(true); 
    };

    const handleCancel = () => {
        setIsEditing(false); 
    };

    const handleSubmit = () => {
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
                setIsEditing(false);
            } else {
                console.error('Failed to submit input number');
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
    const hoursLeft = properties?.['Hours Left']?.formula?.number || 0; 
    
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
                        <Chip className="status" color={statusCheck(statusName)} size="small" label={statusName} />
                        {isEditing ? (
                            <TextField
                            id="outlined-number"
                            label="Update total hours"
                            type="number"
                            size='small'
                            value={inputNumber}
                            onChange={(e) => setInputNumber(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: 0 
                            }}
                            />
                        ) : (
                            <Pencil className="edit" onClick={handleClick} />
                        )}
                        {isEditing && (
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{ justifyContent: "flex-end", marginLeft: 2}}
                            >
                                <Button onClick={handleCancel} variant="outlined">
                                    Cancel
                                </Button>
                                <Button type="submit" onClick={handleSubmit} variant="contained">
                                    Submit
                                </Button>
                            </Stack>
                        )}
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
