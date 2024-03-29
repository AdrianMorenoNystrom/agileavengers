import { DataGrid } from '@mui/x-data-grid';
import useFetchData from '../../components/UseFetchData';
import { useNavigate } from 'react-router-dom'; 
import Button from '@mui/material/Button';
import React, { useState } from "react";


const DataTable = () => {
    const { data, isLoading, error } = useFetchData('/api/projects/active');
    const navigate = useNavigate(); 

    if (isLoading) return <div>Laddar...</div>;
    if (error) return <div>Fel vid hämtning av data: {error}</div>;

    // For button
    const handleClick = (cellValues) => {
        navigate(cellValues.row.url);
    };

    // Sets Columns fields
    const columns = [
        {
            field: "Action",
            headerName: "Action",
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleClick(cellValues);
                        }}
                    >
                        Open
                    </Button>
                );
            }
        },
        // { field: 'id', headerName: 'ID', width: 90 },
        { field: 'projectName', headerName: 'Project Name', width: 150},
        { field: 'hoursLeft', headerName: 'Hours left', width: 150},
        { field: 'endDate', headerName: 'End Date', width: 150},

    ];

    // Maps rows data with properties
    const rows = data?.map(project => ({
        id: project?.properties?.ID?.unique_id?.number,
        projectName: project?.properties?.Projectname?.title?.[0]?.text?.content,
        hoursLeft: project?.properties?.['Hours Left']?.formula?.number || "N/A",
        endDate: project?.properties?.Timespan?.date?.end || "N/A",
        url: `/projects/${project?.id}` 
    })) || [];

    return (
        <div className="dataTable">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                pagination
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </div>
    );
};

export default DataTable;
