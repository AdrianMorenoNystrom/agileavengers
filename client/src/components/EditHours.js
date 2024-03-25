import React from 'react';
import { TextField, Button, Stack } from '@mui/material';

function EditHours({ inputNumber, setInputNumber, handleCancel, submitHours }) {
    
    return (
        <div>
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
                sx={{marginTop: 1}}
            />
            <Stack direction="row" spacing={1} sx={{marginTop: 1, marginBottom: 1}}>
                <Button onClick={handleCancel} variant="outlined">Cancel</Button>
                <Button type="submit" onClick={submitHours} variant="contained">Submit</Button>
            </Stack>
        </div>
    );
}

export default EditHours;
