<template>
  <div class="home">
    <LogIn />
  </div>
</template>

<script lang="ts">
import LogIn from "@/components/LogIn.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { LogIn },
});
</script>
