import axios from "axios";
import { Claim, RecentClaimsResponse } from "./claimApi.types";
import { Comment } from "./claimApi.types";

const claimBackend = axios.create({
    baseURL: 'http://localhost:1110',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const claimApi = {
    async getRecentClaims(page: number, pageSize: number) {
        return await claimBackend.get<RecentClaimsResponse>(`/claims/recent?page=${page}&pageSize=${pageSize}`);
    },
    async getClaimById(id: string) {
        return await claimBackend.get<Claim>(`/claim/${id}`);
    },
    async toggleLike(claimId: string, userId: string) {
        return await claimBackend.put(`/likeClaim/${claimId}/${userId}`);
    },
    async getCommentsByClaim(claimId: string) {
        return await claimBackend.get<Comment[]>(`/getCommentsByClaim?claimId=${claimId}`);
    }
}