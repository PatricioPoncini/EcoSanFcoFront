<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import { claimApi } from "@/services/claimApi";
import { Claim } from "@/services/claimApi.types";
import { defineComponent } from "vue";

export default defineComponent({
  components: { NavBar },
  data() {
    return {
      claims: {} as Claim[],
      page: 1,
      pageSize: 10
    }
  },
  async mounted() {
    this.claims = (await claimApi.getRecentClaims(this.page.toString(), this.pageSize.toString())).data;
    console.log(this.claims);
  },
  methods: {
    formatCreatedAt(createdAt: string) {
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
      const formattedDate = new Date(createdAt).toLocaleDateString('es-ES', options);
      return formattedDate;
    }
  }
});
</script>

<template>
  <NavBar />
  <div class="grid grid-cols-1 background p-8">
    <div v-for="claim in claims" :key="claim._id">
      <a href="#"
        class="flex flex-col items-center mx-auto bg-white border border-gray-200 rounded-lg shadow md:flex-row max-w-3xl hover:bg-gray-100 mb-6">
        <div class="flex flex-col justify-between p-4 leading-normal">
          <div class="flex justify-between">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-left title">{{ claim.title }}</h5>
            <p class="mb-3 font-normal text-gray-700 italic text-slate-500">{{ formatCreatedAt(claim.createdAt)
            }}</p>
          </div>
          <div class="grid grid-cols-2 gap-20">
            <div>
              <p class="mb-3 font-normal text-slate-500 text-left">{{ claim.userOwner.username }}</p>
              <p class="mb-3 font-normal text-black text-left">{{ claim.description }}</p>
              <div class="flex justify-left">
                <img src="../../public/upvote.png" class="w-4 h-4 mr-1 mt-[2px]" />
                <p class="mb-3 font-normal text-gray-700"><b>{{ claim.upVotes.length }}</b></p>
              </div>
            </div>
            <div class="flex justify-center align-center ml-32">
              <img v-if="claim.images && claim.images.length > 0"
                class="object-cover w-full rounded-sm h-96 md:h-auto md:w-48 md:rounded-sm" :src="claim.images[0]"
                alt="" />
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>


<style scoped>
.background {
  background-color: rgb(250, 250, 250);
}

.title {
  font-size: 26px;
  font-weight: 500;
}

.subtitle {
  font-weight: 500;
}
</style>
