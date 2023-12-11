<template>
  <div class="bg-gray-200 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 shadow-md rounded-md">
      <div class="grid grid-cols-1 gap-4">
        <form class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900">
            Bienvenido a EcoSanFco
          </h5>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input type="email" name="email" id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="example@email.com" required />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
            <input type="password" name="password" id="password" placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              required />
          </div>
          <div class="flex items-center justify-between">
            <a href="#" class="text-sm text-green-700 hover:underline text-center">¿Perdiste tu contraseña?</a>
          </div>
          <button type="submit"
            class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Iniciar sesión
          </button>
          <div class="text-sm font-medium text-gray-500">
            ¿No tenés cuenta?
            <a href="#" class="text-green-700 hover:underline">Registrate aquí</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {},
});
</script>

<style scoped></style>
