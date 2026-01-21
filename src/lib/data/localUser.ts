export const DEFAULT_USERNAME = 'PiPiDaStRiC1';

const STORAGE_KEY = 'github-search-last-user';

export const getLastViewedUser = (): string => {
    const lastUser = localStorage.getItem(STORAGE_KEY);
    return lastUser || DEFAULT_USERNAME;
};

export const saveLastViewedUser = (username: string): void => {
    localStorage.setItem(STORAGE_KEY, username);
};

