import React from 'react';
import { useState } from 'react';
import useFetchData from './UseFetchData';

export default function AddProject() {
    const [projectName, setProjectName] = useState("");
    const [hours, setHours] = useState("");

    function SubmitToNotion(event) {
        event.preventDefault(); 

        fetch(('/projects'), {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                projectName: projectName,
                hours: hours
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit project to Notion');
            }
            return response.json();
        })
        .then(data => {
            console.log("Success!", data);
        })
        .catch(error => {
            console.log('Error!', error.message);
        });
    }

    return (
        <div>
            <form onSubmit={SubmitToNotion}>
                <div>
                    <h1>Add project to database</h1>
                    <p>Project Name</p>
                    <input type="text" id="name" value={projectName} onChange={(e) => setProjectName(e.target.value)} required></input>

                    <p>Hours</p>
                    <input type="text" id="hours" value={hours} onChange={(e) => setHours(e.target.value)} required></input>
                </div>
                <div>
                    <button type="submit">
                        Submit project to Notion.
                    </button>
                </div>
            </form>
        </div>
    );
}
