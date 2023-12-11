export interface User {
    username: string;
}

export interface Claim {
    _id: string;
    title: string;
    description: string;
    images: string[];
    upVotes: string[];
    userOwner: User;
    createdAt: string;
}