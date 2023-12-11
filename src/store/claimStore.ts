import { claimApi } from "@/services/claimApi";
import { Claim } from "@/services/claimApi.types";
import { defineStore } from "pinia";

export interface ClaimState {
    recentClaims: Claim[]
}

export const useClaimStore = defineStore('claims', {
    state: (): ClaimState => ({
        recentClaims: []
    }),
    actions: {
        // async listRecentClaims() {
        //     try {
        //         const respons = await claimApi.getRecentClaims()
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    }
});