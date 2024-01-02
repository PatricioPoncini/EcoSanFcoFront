<script lang="ts">
import { mapStores } from "pinia";
import { defineComponent } from "vue";
import { useClaimStore } from '@/store';

export default defineComponent({
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      await this.claimsStore.login(this.username, this.password);
      if (!this.claimsStore.token) {
        console.log('Error setting user data');
      } else {
        window.localStorage.setItem('authToken', this.claimsStore.token);
        console.log(window.localStorage.getItem('authToken'));
        this.$router.push('/recentClaims');
      }
    }
  },
  computed: {
    ...mapStores(useClaimStore)
  }
});
</script>

<template>
  <div class="bg-gray-200 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 shadow-md rounded-md">
      <div class="grid grid-cols-1 gap-4">
        <h5 class="text-xl font-medium text-gray-900">
          Bienvenido a EcoSanFco
        </h5>
        <div>
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
          <input type="username" name="username" id="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="John Doe" v-model="username" />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
          <input type="password" name="password" id="password" placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            v-model="password" />
        </div>
        <div class="flex items-center justify-between">
          <a href="#" class="text-sm text-green-700 hover:underline text-center">¿Perdiste tu contraseña?</a>
        </div>
        <button @click="login"
          class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Iniciar sesión
        </button>
        <div class="text-sm font-medium text-gray-500">
          ¿No tenés cuenta?
          <a href="#" class="text-green-700 hover:underline">Registrate aquí</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
