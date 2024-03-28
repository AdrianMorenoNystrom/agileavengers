import React from 'react';
import { Chip } from "@mui/material";

// Used to check if the display data is global or project specific.
// Adds a tag accordingly.

function ProjectChip({ projectId=false }) {
    const chipColor = projectId ? "success" : "primary";
    
    return (
        <Chip label={projectId ? "Project" : "Global"} color={chipColor} size="small" variant="outlined" />
    );
}

export default ProjectChip;
