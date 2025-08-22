import { useEffect, useState } from 'react';
import {getApi} from "@/lib/api/ApiFactory";
import {useAuth} from "@/providers/AuthProvider";
import {useSecureStorageState} from "@/hooks/storage";

/*
Enhancements To consider
Add refetch capability:
    Add a refetch() function in the return value to manually trigger a reload.

Add cache:
    Store and retrieve responses with an in-memory or local cache.

Optional lazy execution:
    Only fetch when told to (like Apollo’s useLazyQuery).
*/

interface UseApiQueryResult<T> {
    loading: boolean;
    data: T | null;
    error: any;
}

export default function useQuery<T = any>(endpoint: string, method: "GET" | "POST" = "GET", body: any = {}): UseApiQueryResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [{data: token}] = useSecureStorageState('session');

    useEffect(() => {
        let isMounted = true; // to prevent setting state if unmounted

        const fetchData = async () => {
            setLoading(true);
            try {
                const api = await getApi(token);
                const result = await api.fetchData(endpoint, method, body);
                if (isMounted) {
                    setData(result);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                    setData(null);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [endpoint]);

    return { loading, data, error };
}
