import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import useFetchData from './UseFetchData';
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

function generateAvatarInfo(data) {
    const teamMembers = data?.properties?.['Team Members']?.rollup?.array || [];
    return teamMembers.map((teamMember) => {
        const fullName = teamMember?.formula?.string || '';
        const initials = fullName.split(' ').map(word => word[0]).join('');
        const bgColor = stringToColor(fullName);
        return { initials, bgColor,fullName };
    });
}

const GetAllProjectAvatars = ({ projectId }) => {
    const { data, isLoading, error } = useFetchData(`/api/projects/project/${projectId}`, true);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!data) return <div>No data available</div>;

    const avatarInfoList = generateAvatarInfo(data);
    
    return (
        <Stack direction="row" spacing={0.5}>
            {avatarInfoList.map(({ initials, bgColor,fullName }, index) => (
                <Tooltip title={fullName}>
                    <Avatar key={index} sx={{ bgcolor: bgColor }}>
                    {initials}
                </Avatar>
                </Tooltip>
            ))}
        </Stack>
    );
};

export default GetAllProjectAvatars;
