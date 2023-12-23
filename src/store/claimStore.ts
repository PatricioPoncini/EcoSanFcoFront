import { claimApi } from "@/services/claimApi";
import { Claim } from "@/services/claimApi.types";
import { defineStore } from "pinia";

export interface ClaimState {
    recentClaims: Claim[];
    recentClaimsCount: number;
    claim: Claim;
}

export const useClaimStore = defineStore('claims', {
    state: (): ClaimState => ({
        recentClaims: [],
        recentClaimsCount: 0,
        claim: {} as Claim
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
        }
    }
});