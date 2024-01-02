import axios from "axios";
import { Claim, RecentClaimsResponse, Tokens } from "./claimApi.types";
import { Comment } from "./claimApi.types";

const authToken = window.localStorage.getItem('authToken');

const claimBackend = axios.create({
    baseURL: 'http://localhost:1110',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const claimApi = {
    async getRecentClaims(page: number, pageSize: number) {
        console.log(authToken)
        return await claimBackend.get<RecentClaimsResponse>(`/claims/recent?page=${page}&pageSize=${pageSize}`, { headers: { 'Authorization': authToken } });
    },
    async getClaimById(id: string) {
        return await claimBackend.get<Claim>(`/claim/${id}`);
    },
    async toggleLike(claimId: string, userId: string) {
        return await claimBackend.put(`/likeClaim/${claimId}/${userId}`);
    },
    async getCommentsByClaim(claimId: string) {
        return await claimBackend.get<Comment[]>(`/getCommentsByClaim?claimId=${claimId}`);
    },
    async postComment(userId: string, claimId: string, content: string) {
        return await claimBackend.post(`/postComment?userId=${userId}&claimId=${claimId}`, { content: content });
    },
    async login(username: string, password: string) {
        return await claimBackend.post<Tokens>(`/signIn`, { username: username, password: password });
    }
}