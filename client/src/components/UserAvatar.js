import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import useFetchData from './UseFetchData';
import stringToColor from './functions/stringToColor';
import LoadingContext from './functions/LoadingContext'

function generateAvatarInfo(data) {
    const fullName = data?.properties?.['Full Name']?.formula?.string || '';
    const initials = fullName.split(' ').map(word => word[0]).join('');
    const bgColor = stringToColor(fullName);

    return { initials, bgColor };
}

const GetAvatar = () => {
    const { data, isLoading, error } = useFetchData('/api/people/user');

    if (isLoading) return <LoadingContext/>;
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