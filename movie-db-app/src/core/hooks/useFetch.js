import { useState, useEffect, useCallback } from 'react';
import useAuthApi from './useAuthApi';

const useFetch = (apiCall) => {
    const withAuth = useAuthApi();

    const [data, setData] = useState();
    const [error, setError] = useState();

    const fetchData = useCallback((isCurrent = true) => {
        withAuth(apiCall())
        .then((data) => isCurrent && setData(data))
        .catch((error) => {
            isCurrent && setError(error);
        });
    }, [apiCall, withAuth]);

    const refresh = () => {
        fetchData();
    };

    useEffect(() => {
        setData(null);
        setError(null);
        if (apiCall) {
            let isCurrent = true;

            fetchData(isCurrent);

            return () => {
                isCurrent = false
            };
        }
    }, [apiCall, fetchData]);

    const isLoading = !data && !error;

    return {
        data,
        setData,
        error,
        setError,
        refresh,
        isLoading,
    }
};

export default useFetch;
