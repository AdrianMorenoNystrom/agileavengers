import React from 'react';
import useFetchData from "./UseFetchData";

const GetUserId = () => {
    const { data, isLoading, error } = useFetchData("/api/people/user");

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return <div>{data && data?.id}</div>;
};

export default GetUserId;
