import {getUsers} from '@/lib/index';
import type {User} from '@/types/index'
import { useEffect, useState } from 'react';

export const useUser = (user: string) => {
    const [data, setData] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const load = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getUsers(user, signal); 
                
                if (!signal.aborted) {
                    setData(data); 
                }
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    setError(error)
                }
            } finally {
                if (!signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        load();
        return () => {
            controller.abort(); 
        }
    }, [user]);

    return {data, isLoading, error}
}