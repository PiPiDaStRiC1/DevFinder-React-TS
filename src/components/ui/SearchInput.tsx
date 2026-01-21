import { useState } from "react";
import SearchIcon from '@/assets/icon-search.svg';
import {DEFAULT_USERNAME} from '@/lib/index';

interface SearchInputProps {
    onSearch: (query: string) => void;
    value: string;
}

export const SearchInput = ({onSearch, value}: SearchInputProps) => {
    const [query, setQuery] = useState(value);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    const handleClear = () => {
        setQuery("");
        onSearch(DEFAULT_USERNAME.trim());
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative flex items-center gap-1 sm:gap-2 bg-[var(--input-color)] rounded-lg shadow-sm hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <div className="pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <img src={SearchIcon} alt="search" className="w-4 h-4 sm:w-5 sm:h-5 opacity-60" />
                </div>

                <input
                    type="text"
                    value={query}
                    placeholder="Search GitHub username..."
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent py-2.5 sm:py-3 text-sm sm:text-base outline-none text-[var(--input-text-color)] placeholder-[var(--input-text-color)]"
                />

                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                        aria-label="Clear"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                <button
                    type="submit"
                    className="cursor-pointer px-3 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-r-lg transition-colors disabled:bg-[var(--input-text-color)] disabled:cursor-not-allowed shrink-0"
                    disabled={!query.trim()}
                >
                    <span className="hidden min-[420px]:inline">Search</span>
                    <svg className="w-4 h-4 min-[420px]:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </form>
    )
}