export interface Post {
    id: number;
    description: string;
    read: boolean;
    favorite: boolean;
    profileId: number;
}

export interface Profile {
    id: number,
    name: string,
    email: string,
    phone: string,
    website: string,
}

export interface Comments {
    id: number,
    body: string,
    postId: number,
}