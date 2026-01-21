export interface GHUser {
    login: string,
    id: number,
    avatar_url: string,
    name: string,
    company: string | null,
    location: string | null,
    twitter_username: string | null,
    blog: string | null,
    public_repos: number,
    bio: string | null,
    followers: number,
    following: number,
    created_at: string 
}

export interface GHUserResponseError {
    message: string,
    documentation_url: string,
    status?: string
}

export type User = GHUser | null;