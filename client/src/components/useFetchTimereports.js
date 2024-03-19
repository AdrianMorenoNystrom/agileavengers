import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchTimereports(projectId) {
    const [timereports, setTimereports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimereports = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/api/timereports', {
                    params: {
                        project_id: projectId
                    }
                });

                if (response.status === 401) {
                    throw new Error('Unauthorized');
                }

                setTimereports(response.data);
            } catch (error) {
                console.error('Error fetching timereports:', error);
                setError('Failed to fetch timereports');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTimereports();
    }, [projectId]);

    return { timereports, isLoading, error };
}

export default useFetchTimereports;
