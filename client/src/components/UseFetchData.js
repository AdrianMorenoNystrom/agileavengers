import { useState, useEffect } from 'react';

function useFetchData(url, isSingle) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const body = await response.json();
                
                if (!isSingle) {
                    setData(body.message);
                } else setData(body.data);
                
                
            } catch (error) {
                console.error(error.message);
                setError(`Error: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, isSingle]);

    return { data, isLoading, error };
}

export default useFetchData;
