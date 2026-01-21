import type {GHUser, GHUserResponseError} from '@/types/index'

const API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

export const getUsers = async (user: string, signal: AbortSignal): Promise<GHUser> => {
    const response = await fetch(`https://api.github.com/users/${user}`, {
        headers: {
            'Authorization': `token ${API_KEY}`
        },
        signal: signal
    }); 

    if (!response.ok) {
        const errorData = await response.json() as GHUserResponseError;
        throw new Error(errorData.message || 'User not found!');
    }

    const data: GHUser = await response.json();

    return data;
}