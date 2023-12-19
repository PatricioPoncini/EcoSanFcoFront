<script lang="ts">
import { useClaimStore } from '@/store/claimStore';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            claimId: ''
        }
    },
    async mounted() {
        this.claimId = this.$route.query['claimId'] as string;
        await this.claimsStore.setClaim(this.claimId);
    },
    methods: {
        formatCreatedAt(createdAt: string) {
            const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
            const formattedDate = new Date(createdAt).toLocaleDateString('es-ES', options);
            return formattedDate;
        },
    },
    computed: {
        ...mapStores(useClaimStore),
    }
});
</script>

<template>
    <div class="grid grid-cols-1">
        <div class="flex p-6 text-left">
            <div class="grid grid-col-3 w-full">
                <div class="flex justify-between items-center">
                    <div class="text-3xl text-black">{{ claimsStore.claim.title }}</div>
                    <div>{{ formatCreatedAt(claimsStore.claim.createdAt) }}</div>
                </div>
                <div class="flex mb-6">
                    <!-- <div>{{ claimsStore.claim.userOwner.username }}</div> -->
                </div>
                <div class="flex">
                    <div class="text-lg text-black"> {{ claimsStore.claim.description }}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-1 p-6 mt-10">
        <div class="flex">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="image in claimsStore.claim.images">
                    <img class="h-auto max-w-full rounded-lg" alt="Image" :src="image">
                </div>
            </div>
        </div>
    </div>
</template>