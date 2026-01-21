import { useState } from "react";
import { SearchInput, InfoCard} from '@/components/index'
import {getLastViewedUser, saveLastViewedUser} from '@/lib/index'


export const Main = () => {
    const [username, setUsername] = useState(getLastViewedUser());

    const handleSearch = (newUsername: string) => {
        setUsername(newUsername);
        saveLastViewedUser(newUsername);
    };

    return (
        <main className="min-h-screen max-w-2xl flex flex-col gap-10 mx-auto px-8">
            <SearchInput onSearch={handleSearch} value={username}/>
            <InfoCard username={username}/>
        </main>
    )
}