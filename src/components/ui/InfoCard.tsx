import { useUser } from '@/hooks/index';
import CompanyIcon from '@/assets/icon-company.svg';
import LocationIcon from '@/assets/icon-location.svg';
import WebsiteIcon from '@/assets/icon-website.svg';
import TwitterIcon from '@/assets/icon-twitter.svg';
import { useState } from 'react';

interface InfoCardProps {
    username: string;   
}

export const InfoCard = ({username}: InfoCardProps) => {
    const {data, isLoading, error} = useUser(username);
    const [isAvatarLoading, setIsAvatarLoading] = useState(false);

    if (isLoading) {
        return (
            <div className="bg-[var(--card-color)] border border-gray-200 rounded-lg p-6 shadow-sm animate-pulse">
                <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-[var(--card-loading-color)] rounded-full" />
                    <div className="flex-1 space-y-3">
                        <div className="h-6 bg-[var(--card-loading-color)] rounded w-1/3" />
                        <div className="h-4 bg-[var(--card-loading-color)] rounded w-1/2" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[var(--card-color)] border border-gray-200 rounded-lg p-4 text-[var(--card-error-color)]">
                <p className="font-medium text-center">⚠️ Fetch Error</p>
                <p className="text-sm mt-1 text-center">{error.message}</p>
            </div>
        );
    }

    if (!data || !('login' in data)) {
        return null;
    }

    return (
        <div className="bg-[var(--card-color)] text-[var(--input-text-color)] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className='relative shrink-0'>
                        {isAvatarLoading && (
                            <div className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-[var(--card-loading-color)] rounded-full animate-pulse" />
                        )}
                        <img 
                            src={data.avatar_url} 
                            alt={data.login} 
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-2 ring-gray-100"
                            onLoad={() => setIsAvatarLoading(false)}
                        />
                    </div>
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                        <h2 className="text-xl sm:text-2xl font-bold truncate">
                            {data.name || data.login}
                        </h2>
                        <a 
                            href={`https://github.com/${data.login}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                        >
                            @{data.login}
                        </a>
                        <p className="text-xs mt-2 sm:hidden">
                            Joined {new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        </p>
                    </div>
                    <p className="hidden sm:block text-xs">
                        Joined {new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                {data.bio && (
                    <p className="mt-4 leading-relaxed text-sm sm:text-base text-center sm:text-left">{data.bio}</p>
                )}
            </div>

            <div className="p-4 sm:p-6">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div className="bg-[var(--card-info-color)] rounded-lg p-2 sm:p-3 hover:bg-[var(--card-info-hover-color)] transition-colors">
                        <div className="text-lg sm:text-2xl font-bold text-[var(--card-info-text-color)]">{data.public_repos}</div>
                        <div className="text-[10px] sm:text-xs text-gray-600 mt-1">Repos</div>
                    </div>
                    <div className="bg-[var(--card-info-color)] rounded-lg p-2 sm:p-3 hover:bg-[var(--card-info-hover-color)] transition-colors">
                        <div className="text-lg sm:text-2xl font-bold text-[var(--card-info-text-color)]">{data.followers}</div>
                        <div className="text-[10px] sm:text-xs text-gray-600 mt-1">Followers</div>
                    </div>
                    <div className="bg-[var(--card-info-color)] rounded-lg p-2 sm:p-3 hover:bg-[var(--card-info-hover-color)] transition-colors">
                        <div className="text-lg sm:text-2xl font-bold text-[var(--card-info-text-color)]">{data.following}</div>
                        <div className="text-[10px] sm:text-xs text-gray-600 mt-1">Following</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2 w-full mt-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center text-[var(--input-text-color)] justify-center gap-2">
                        <img src={CompanyIcon} alt="company-icon" />
                        <span>{data.company ? data.company : "Not available"}</span>
                    </div>
                    <div className="flex items-center text-[var(--input-text-color)] justify-center gap-2">
                        <img src={LocationIcon} alt="location-icon" />
                        <span>{data.location ? data.location : "Not available"}</span>
                    </div>
                    <div className="flex items-center text-[var(--input-text-color)] justify-center gap-2">
                        <img src={TwitterIcon} alt="twitter-icon" />
                        {data.twitter_username ? (
                            <a
                                className='text-gray-600 hover:text-gray-800 text-sm font-medium hover:underline'
                                href={`https://twitter.com/${data.twitter_username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @{data.twitter_username}
                            </a>
                        ) : (
                            <span>Not available</span>
                        )}
                    </div>
                    <div className="flex items-center text-[var(--input-text-color)] justify-center gap-2">
                        <img src={WebsiteIcon} alt="website-icon" />
                        {data.blog ? (
                            <a
                                className='text-gray-600 hover:text-gray-800 text-sm font-medium hover:underline'
                                href={data.blog.startsWith('http') ? data.blog : `https://${data.blog}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {data.blog}
                            </a>
                        ) : (
                            <span>Not available</span>
                        )}
                    </div>
                </div>

                <a
                    href={`https://github.com/${data.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full bg-gray-900 hover:bg-gray-800 text-white text-center py-2.5 rounded-lg font-medium transition-colors duration-200"
                >
                    Go to GitHub →
                </a>
            </div>
        </div>
    );
}