import React from 'react';
import useFetchData from "./UseFetchData";

const GetNameOfUser = ({ id }) => {
    const { data, isLoading, error } = useFetchData(`/api/people/${id}`);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return <div>{data && data?.properties?.['Full Name']?.formula?.string}</div>;
};

export default GetNameOfUser;
