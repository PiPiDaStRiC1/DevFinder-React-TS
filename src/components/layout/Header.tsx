import MoonIcon from '@/assets/icon-moon.svg?react';
import SunIcon from '@/assets/icon-sun.svg?react';
import { useEffect, useState } from 'react'

const initTheme = () => {
    try {
        return localStorage.getItem('theme') === 'light';
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error accessing localStorage:', error.message);
        }
        return true;
    }
}

export const Header = () => {
    const [isDark, setIsDark] = useState(initTheme);
    const themeText = isDark ? 'Dark' : 'Light'
    const Icon = isDark ? MoonIcon : SunIcon;
    
    useEffect(() => {
        document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    }, [isDark])

    return (
        <header className="flex px-8 justify-between h-28 items-center max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-[var(--header-color)]">DevFinder</h1>
            <button 
                className="flex gap-2 cursor-pointer"
                onClick={() => setIsDark(!isDark)}
            >
                <span className='text-lg text-[var(--switcher-color)]'>{themeText}</span>
                <Icon className='h-7 w-7 fill-[var(--switcher-color)]' />
            </button>
        </header>
    )
}