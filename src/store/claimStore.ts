import { claimApi } from "@/services/claimApi";
import { Claim, Comment } from "@/services/claimApi.types";
import { defineStore } from "pinia";

export interface ClaimState {
    recentClaims: Claim[];
    recentClaimsCount: number;
    claim: Claim;
    comments: Comment[];
    token: string;
}

export const useClaimStore = defineStore('claims', {
    state: (): ClaimState => ({
        recentClaims: [],
        recentClaimsCount: 0,
        claim: {} as Claim,
        comments: [],
        token: ''
    }),
    actions: {
        async listRecentClaims(page: number, pageSize: number) {
            try {
                const response = await claimApi.getRecentClaims(page, pageSize);
                this.recentClaims = response.data.recentClaims;
                this.recentClaimsCount = response.data.recentClaimsCount;
            } catch (error) {
                console.log(error);
            }
        },
        async setClaim(id: string) {
            try {
                const response = await claimApi.getClaimById(id);
                this.claim = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async toggleLike(claimId: string, userId: string) {
            try {
                await claimApi.toggleLike(claimId, userId);
                await this.setClaim(claimId);
            } catch (error) {
                console.log(error);
            }
        },
        async getCommentsByClaim(claimId: string) {
            try {
                const response = await claimApi.getCommentsByClaim(claimId);
                this.comments = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async postNewComment(userId: string, claimId: string, content: string) {
            try {
                await claimApi.postComment(userId, claimId, content);
                const response = await claimApi.getCommentsByClaim(claimId);
                this.comments = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async login(email: string, password: string) {
            try {
                const response = await claimApi.login(email, password);
                this.token = response.data.token.authToken;
            } catch (error) {
                console.log(error);
            }
        }
    }
});