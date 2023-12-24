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

export interface RecentClaimsResponse {
    recentClaims: Claim[];
    recentClaimsCount: number;
}

export interface Comment {
    claimId: string;
    user: {
        _id: string;
        username: string;
    },
    content: string;
    createdAt: Date;
}