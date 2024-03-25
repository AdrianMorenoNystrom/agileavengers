import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import useFetchData from './UseFetchData';
<<<<<<< HEAD:client/src/components/GetProjectAvatar.js
import { useParams } from 'react-router-dom'; 
import Tooltip from '@mui/material/Tooltip';

function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}
=======
import { useParams } from 'react-router-dom';
import stringToColor from './functions/stringToColor';
>>>>>>> 9b2ba1f2f8738837c7141f6a815c8bb23943fc79:client/src/components/TeamAvatars.js

function generateAvatarInfo(data) {
    const teamMembers = data?.properties?.['Team Members']?.rollup?.array || [];

    return teamMembers.map((teamMember) => {
        const fullName = teamMember?.formula?.string || '';
        const initials = fullName.split(' ').map(word => word[0]).join('');
        const bgColor = stringToColor(fullName);
        return { initials, bgColor,fullName };
    });
}

const GetAvatars = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useFetchData(`/api/projects/project/${id}`, true);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!data) return <div>No data available</div>;

    const avatarInfoList = generateAvatarInfo(data);

    return (
        <Stack direction="row">
            {avatarInfoList.map(({ initials, bgColor, fullName}, index) => (
                <Tooltip title={fullName}>
                    <Avatar key={index} sx={{ bgcolor: bgColor}}>
                    {initials}
                </Avatar>
                </Tooltip>
            ))}
        </Stack>
    );
};

export default GetAvatars;
