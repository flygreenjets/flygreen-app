import { useState } from 'react';
import { getApi } from "@/lib/api/ApiFactory";
import { useAuth } from "@/providers/AuthProvider";

interface UseApiMutationResult<T> {
    data: T | null;
    loading: boolean;
    error: any;
}

type MutateFn<T, V = any> = (variables?: V) => Promise<T | null>;

export default function useMutation<T = any, V = any>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
): [MutateFn<T, V>, UseApiMutationResult<T>] {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const {token} = useAuth();

    const mutate: MutateFn<T, V> = async (variables?: V) => {
        setLoading(true);
        setError(null);

        try {
            const api = await getApi(token);
            const result = await api.fetchData(endpoint, method, variables || {});
            setData(result);
            return result;
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return [mutate, { data, loading, error }];
}
