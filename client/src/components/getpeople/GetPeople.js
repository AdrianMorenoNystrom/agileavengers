import React from 'react';
import useFetchData from '../UseFetchData';
// import { User, Clock } from 'lucide-react';
import './getpeople.scss';

export default function GetPeopleNew() {
    const { data } = useFetchData("/api/people");

    // Temporary slice to show only 5 entries, 
    // pagination should be implemented instead
    const filteredItems = data ? data.slice(0, 5) : [];

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((page) => (
                        <tr key={page.id}>
                            <td>{page?.properties?.Name?.title?.[0]?.text?.content}</td>
                            <td>{page?.properties?.['Total hours']?.rollup?.number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
