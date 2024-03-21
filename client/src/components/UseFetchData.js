import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from './AuthContext';

function useFetchData(url, isSingle) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(url);

                if (response.status === 401) {
                    setIsAuthenticated(false);
                    navigate("/login");
                }

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
    }, [url, setIsAuthenticated, isSingle, navigate]);

    return { data, isLoading, error };
}

export default useFetchData;
