import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const callBackendAPI = async () => {
            try {
                const response = await fetch('/api');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const body = await response.json();
                setData(body.message);
            } catch (error) {
                console.error(error.message);
            }
        };
        callBackendAPI();
    }, []);

    return (
        <div className="App">
            <h1>People - Notion Data</h1>
            <table className="table">
                <div className="row-title">
                    <div>Name</div>
                    <div>Total Hours</div>
                </div>
                {data &&
                    data.map((page) => {
                        console.log(page); // Gör så att vi se objektet i konsolen.
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
            </table>
        </div>
    );
}
export default App;
