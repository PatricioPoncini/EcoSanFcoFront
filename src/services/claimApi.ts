import axios from "axios";
import { Claim } from "./claimApi.types";

const claimBackend = axios.create({
	baseURL: 'http://localhost:1110',
	withCredentials: true,
	headers: {
        'Content-Type': 'application/json'
    }
});

export const claimApi = {
    async getRecentClaims(page: string, pageSize: string) {
        return await claimBackend.get<Claim[]>(`/claims/recent?page=${page}&pageSize=${pageSize}`);
    }
}