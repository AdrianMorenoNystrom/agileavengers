import React from 'react';
import { useState } from 'react';
import '../teststyle.css'

export default function AddProject() {
    const [projectName, setProjectName] = useState("");
    const [hours, setHours] = useState("");
    const[projectStart,setProjectStart] = useState("");
    const[projectEnd,setProjectEnd] = useState("");

    // Projects get the "status" of Next up automatically when added. 
    const status = "Next up";

    function SubmitToNotion(event) {
        event.preventDefault(); 

        fetch(('/projects/add'), {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                projectName: projectName,
                hours: hours,
                status:status,
                projectStart:projectStart,
                projectEnd:projectEnd
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
        <div className='content'>
            <form onSubmit={SubmitToNotion}>
                <div>
                    <h1>Add project to database</h1>
                    <p>Project Name</p>
                    <input type="text" id="name" value={projectName} onChange={(e) => setProjectName(e.target.value)} required></input>

                    <p>Hours</p>
                    <input type="text" id="hours" value={hours} onChange={(e) => setHours(e.target.value)} required></input>

                    <p>Timespan</p>
                    <span>From: </span>
                    <input type='date' id="timefrom"  min="2024-01-01" max="2026-01-01" onChange={(e) => setProjectStart(e.target.value)} required></input>
                    <p></p>
                    <span>To: </span><input type='date' id="timeto"  min="2024-01-01" max="2026-01-01" onChange={(e) => setProjectEnd(e.target.value)} required></input>
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
