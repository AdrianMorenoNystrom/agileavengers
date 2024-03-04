import React, { useEffect, useState } from "react";
import UseFetchData from "./UseFetchData";

const AddPeople = () => {
    const [name, setName] = useState('');
    const data = UseFetchData('/people');
    const [peopleData, setPeopleData] = useState([]);

    useEffect(() => {
        setPeopleData(data);
    }, [data]);

    const submitToNotion = async () => {
        try {
            const response = await fetch(('/people/addName'), {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Notion-Version": "2022-06-28"
                },
                body: JSON.stringify({
                    properties: {
                        Name: {
                            title: [
                                {
                                    text: {
                                        content: name
                                    }
                                }
                            ]
                        }
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit data to Notion.');
            }

        } catch (error) {
            console.error(error.message);
        } finally {
            setName('');
        }
    };

    return (
        <div className="App">
            <h1>People - Notion Data</h1>
            <div className="table">
                <div className="row-title">
                    <div>Name</div>
                    <div>Total Hours</div>
                </div>
                {peopleData &&
                    peopleData.map((page) => {
                        return (
                            <div className="table-content" key={page.id}>
                                <div className="names">
                                    <p>{page?.properties?.Name?.title?.[0]?.text?.content}</p>
                                </div>
                                <div className="total-hours">
                                    <p>{page?.properties?.['Total hours']?.rollup?.number}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className='name-input'>
                Enter a name:{' '}
                <input
                    className='input-box'
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <button className="submit-btn" onClick={submitToNotion}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AddPeople;