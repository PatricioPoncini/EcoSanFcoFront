<script lang="ts">
import { useClaimStore } from '@/store/claimStore';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            claimId: '',
            like: false
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
        handleLike() {
            if (this.like) {
                this.like = false;
            } else {
                this.like = true;
            }
        }
    },
    computed: {
        ...mapStores(useClaimStore),
    }
});
</script>

<template>
    <div class="grid grid-cols-1 p-20">
        <div class="grid grid-cols-1">
            <div class="flex text-left">
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
        <div class="grid grid-cols-1 mt-10">
            <div class="flex">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div v-for="image in claimsStore.claim.images">
                        <img class="h-auto max-w-full rounded-lg" alt="Image" :src="image">
                    </div>
                </div>
            </div>
        </div>
        <div class="flex gap-4 mt-10">
            <div class="flex justify-center items-center">
                <span class="bg-white p-2 text-black rounded-lg cursor-pointer border-2" @click="handleLike" v-if="!like">Me
                    gusta</span>
                <span class="bg-red-500 p-2 text-white rounded-lg cursor-pointer" @click="handleLike" v-else>Ya no me
                    gusta</span>
            </div>
            <div class="flex justify-center items-center">
                <span class="bg-blue-600 p-2 text-white rounded-lg cursor-pointer">Comentar</span>
            </div>
        </div>
    </div>
</template>