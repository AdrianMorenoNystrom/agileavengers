import React from 'react';
import useFetchData from './UseFetchData';

const GetPeople = ({ people }) => {
    const data = useFetchData('/people');

    return (
        <>
            <h1>People - Notion Data</h1>
            <div className="table">
                <div className="row-title">
                    <div>Name</div>
                    <div>Total Hours</div>
                </div>
                {data &&
                    data.map((page) => {
                        // console.log(page); // Gör så att vi se objektet i konsolen.
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
        </>
    );
};

export default GetPeople;