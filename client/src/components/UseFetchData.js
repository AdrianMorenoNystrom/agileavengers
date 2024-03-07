import { useState, useEffect } from 'react';

function useFetchData(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const body = await response.json();
                setData(body.message);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [url]);

    return { data };
}

export default useFetchData;
