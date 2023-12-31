<script lang="ts">
import { useClaimStore } from '@/store/claimStore';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import SpinnerLoader from '@/components/SpinnerLoader.vue';
import CommentClaim from '@/components/CommentClaim.vue';

export default defineComponent({
    components: { SpinnerLoader, CommentClaim },
    data() {
        return {
            claimId: '',
            like: false,
            loading: false,
            upVotesCount: 0,
            openCommentBox: false,
            comment: ''
        }
    },
    async mounted() {
        this.loading = true;

        this.claimId = this.$route.query['claimId'] as string;
        await this.claimsStore.setClaim(this.claimId);
        await this.claimsStore.getCommentsByClaim(this.claimId);
        if (this.claimsStore.claim.upVotes.includes('655e92ed239d0b217054a283')) {
            this.like = true;
        }
        this.upVotesCount = this.claimsStore.claim.upVotes.length;

        this.loading = false;
    },
    methods: {
        formatCreatedAt(createdAt: string) {
            const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
            const formattedDate = new Date(createdAt).toLocaleDateString('es-ES', options);
            return formattedDate;
        },
        async handleLike() {
            if (this.like) {
                this.like = false;
            } else {
                this.like = true;
            }
            await this.claimsStore.toggleLike(this.claimId, '655e92ed239d0b217054a283');
        },
        handleComment() {
            if (!this.openCommentBox) {
                this.openCommentBox = true;
            } else {
                this.openCommentBox = false;
            }
        },
        async postNewComment() {
            await this.claimsStore.postNewComment('655e92ed239d0b217054a283', this.claimId, this.comment);
            this.openCommentBox = false;
        }
    },
    computed: {
        ...mapStores(useClaimStore),
    }
});
</script>

<template>
    <div class="grid grid-cols-1 p-14" v-if="!loading">
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
        <div class="flex gap-10 mt-10">
            <div class="flex justify-center items-center gap-2">
                <font-awesome-icon icon="fa-regular fa-thumbs-up"
                    class="icon h-8 w-8 cursor-pointer transition-transform transform hover:scale-110" @click="handleLike"
                    v-if="!like" />
                <font-awesome-icon icon="fa-solid fa-thumbs-up"
                    class="icon h-8 w-8 cursor-pointer transition-transform transform hover:scale-110" @click="handleLike"
                    v-else />
                <div v-if="claimsStore.claim.upVotes !== undefined">{{ claimsStore.claim.upVotes.length }}</div>
            </div>
            <div class="flex justify-center items-center gap-2">
                <font-awesome-icon icon="fa-regular fa-message"
                    class="icon h-7 w-7 cursor-pointer transition-transform transform hover:scale-110"
                    @click="handleComment" />
                <div>{{ claimsStore.comments.length }}</div>
            </div>
        </div>
        <div class="flex flex-col" v-if="openCommentBox">
            <div class="flex flex-col mt-6 w-[500px]">
                <textarea class="border border-gray-400 p-2 mb-4" placeholder="Escribe algo..." v-model="comment" />
            </div>
            <div class="flex">
                <span class="cursor-pointer text-white bg-gray-800 text-white p-1 rounded-full pl-8 pr-8"
                    @click="postNewComment">Comentar</span>
            </div>
        </div>
        <div class="grid grid-cols-1">
            <div class="flex">
                <div class="text-black mt-8 text-3xl">Comentarios</div>
            </div>
            <div v-if="claimsStore.comments.length > 0">
                <div class="flex" v-for="comment in claimsStore.comments" :key="comment.claimId">
                    <CommentClaim :content="comment.content" :username="comment.user.username"
                        :createdAt="comment.createdAt" />
                </div>
            </div>
            <div v-else>
                <!-- Puedes agregar un mensaje de carga o cualquier otra lógica aquí mientras esperas que los comentarios se carguen -->
                Cargando comentarios...
            </div>
        </div>
    </div>
    <div class="grid grid-cols-1" v-else>
        <div class="flex justify-center items-center h-screen">
            <SpinnerLoader />
        </div>
    </div>
</template>