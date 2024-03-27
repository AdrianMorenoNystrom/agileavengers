import React, { useState, useEffect } from 'react';
import useFetchData from '../../components/UseFetchData';
import { useParams } from 'react-router-dom';
import dateFormatter from '../../components/functions/dateFormatter';
import GetProjectAvatar from '../../components/TeamAvatars';
import Chip from '@mui/material/Chip';
import ProjectChart from '../../components/ProjectChart';
import '../../components/single/single.scss';
import './project.scss';
import statusCheck from '../../components/functions/statusCheck';
import { Pencil } from 'lucide-react';
import AlertMessage from '../../components/AlertMessage';
import EditHours from '../../components/EditHours';
import EditEndDate from '../../components/EditEndDate';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AvatarGroup from '@mui/material/AvatarGroup';
import '../../components/single/single.scss';
import './project.scss';
import TimeLine from '../../components/Timeline/TimeLine';
import CategoryChart from '../../components/CategoryChart';
import WeeklyReport from '../../components/GetWeeklyReport';
import PageLoadingContext from '../../components/functions/PageLoadingContext';

function Project() {
    const { id } = useParams();

    const [isEditingHour, setIsEditingHour] = useState(false);
    const [isEditingDate, setIsEditingDate] = useState(false);
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [endDate, setEndDate] = useState('');
    const [inputNumber, setInputNumber] = useState('');
    const [alertMessage, setAlertMessage] = useState({});
    const [statusName, setStatusName] = useState('');
    const [hoursTotal, setHoursTotal] = useState(null);

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

    const handleStatusClick = () => {
        setIsEditingStatus(prevState => !prevState);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/projects/project/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }, true);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();

                const newStatusName = result.data?.properties?.Status?.select?.name;
                setStatusName(newStatusName);

                const newEndDate = result.data?.properties?.Timespan?.date?.end;
                setEndDate(newEndDate);

                const newHoursTotal = result.data?.properties?.['Total Hours']?.number;
                setHoursTotal(newHoursTotal);
            } catch (error) {
                console.error("Error fetching categories: ", error);
            }
        };
        fetchData();
    }, [id]);

    const submitHours = () => {
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
                    setHoursTotal(inputNumber);
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
                    setEndDate(newEndDate);
                } else {
                    console.error('Failed to submit new enddate');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const submitStatus = (inputStatus) => {
        fetch(`/api/projects/changeStatus/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputStatus }),
            credentials: "include",
        })
            .then(response => {
                if (response.ok) {
                    setAlertMessage({
                        message: "Status updated to: " + inputStatus,
                        severity: "success"
                    });
                    setIsEditingStatus(false);
                    setStatusName(inputStatus);
                } else {
                    console.error('Failed to update status');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setIsEditingStatus(false);
    };

    const { data, isLoading, error } = useFetchData(`/api/projects/project/${id}`, true);

    if (isLoading) return <PageLoadingContext />;
    if (error) return <div>{error}</div>;
    if (!data) return <div>No data available</div>;

    const properties = data.properties;
    const projectName = properties?.Projectname?.title[0]?.plain_text || '';
    const startDate = new Date(data.created_time);
    const leaderName = properties?.['Project Leader Name']?.rollup?.array?.[0]?.formula?.string || '';
    const description = properties?.Description?.rich_text?.[0]?.plain_text || '';

    const buttons = ["Active", "Next up", "Paused", "Done"]
        .filter(status => status !== statusName)
        .map(status => (
            <Button key={status} color={statusCheck(status)} onClick={() => submitStatus(status)}>
                {status}
            </Button>
        ));

    return (
        <div className='single'>
            <div className='project'>
                <div className='grid-item landscape project-heading'>
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
                        <div>
                            <Pencil className="edit" size={12} onClick={handleStatusClick} />
                            {isEditingStatus ? (
                                <ButtonGroup
                                    size="small"
                                    aria-label="Small button group"
                                    sx={{ marginLeft: 2 }}>
                                    {buttons}
                                </ButtonGroup>
                            ) : null}
                        </div>
                    </div>
                    <div className="project-info">
                        <div className='item'>
                            <div className='itemTitle'>Start date: </div>
                            <div className='itemValue'>{dateFormatter.format(startDate)}</div>
                        </div>
                        <div className='item'>
                            <div className='itemTitle'>End date: <Pencil className="edit" size={12} onClick={handleDateClick} /> </div>
                            <div className='itemValue'>{endDate}</div>
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
                            <div className='itemTitle'>Total hours: <Pencil className="edit" onClick={handleHourClick} size={12} /></div>
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
                                <AvatarGroup key={id} max={4} spacing={0}>
                                    <GetProjectAvatar />
                                </AvatarGroup>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='itemTitle'>Project info</div>
                            {<p className='itemValue'>{description}</p>}
                        </div>
                    </div>
                </div>
                <div className='grid-item box'><TimeLine projectId={id} /></div>
                <div className='grid-item box'>
                    <WeeklyReport projectId={id} />
                </div>
                <div className='grid-item box charts'><CategoryChart project={data} /> </div>
                <div className='grid-item box charts'><ProjectChart project={data} /></div>
            </div>
        </div>
    );
}

export default Project;