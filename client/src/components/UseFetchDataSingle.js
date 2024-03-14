import { useState, useEffect } from 'react';

function useFetchDataSingle(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const body = await response.json();
                setData(body.data); // <-- behövde byta message till data
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [url]);

    return { data };
}

export default useFetchDataSingle;


