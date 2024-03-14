import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import useFetchData from './UseFetchData';

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
    const fullName = data?.properties?.['Full Name']?.formula?.string || '';
    const initials = fullName.split(' ').map(word => word[0]).join('');
    const bgColor = stringToColor(fullName);

    return { initials, bgColor };
}

const GetAvatar = () => {
    const { data, isLoading, error } = useFetchData('/api/people/user');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!data) return <div>No data available</div>;

    const { initials, bgColor } = generateAvatarInfo(data);

    return (
        <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: bgColor }}>{initials}</Avatar>
        </Stack>
    );
};

export default GetAvatar;