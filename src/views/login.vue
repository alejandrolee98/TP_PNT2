<template>
  <div class="bg-black min-vh-100 d-flex flex-column align-items-center pt-5">
    <div class="card bg-transparent border-0" style="width: 400px;">
      <div class="card-body">
        <h1 class="text-white text-center mb-4">Login</h1>
        <form @submit.prevent="handleLogin">
          <!-- Username -->
          <div class="mb-3">
            <input
              type="email"
              class="form-control form-control-lg bg-light"
              placeholder="Email"
              v-model="email"
              required
            >
          </div>
         
          <!-- Password -->
          <div class="mb-3">
            <input
              type="password"
              class="form-control form-control-lg bg-light"
              placeholder="Password"
              v-model="password"
              required
            >
          </div>

          <!-- Botones en línea -->
          <div class="d-flex">
            <button
              type="submit"
              class="login btn btn-lg w-50"
              style="background-color: var(--primary-color); color: white;"
              @click="login"
            >
              Iniciar sesión
            </button>

            <button
              class="login btn btn-lg w-50 ms-2"
              style="background-color: var(--primary-color); color: white;"
              @click="registrar"
            >
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores';
import userService from '../services/userService'; // Importar el servicio centralizado

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

/**
 * Maneja el inicio de sesión del usuario.
 */
const handleLogin = async () => {
  try {
    const user = await userService.login(email.value, password.value); // Centralizar la lógica de autenticación
    if (user) {
      authStore.$patch({ user, token: user.token }); // Actualizar estado de AuthStore
      navegarDespuesLogin(); // Redireccionar según rol
    } else {
      alert('Credenciales inválidas. Por favor, inténtelo de nuevo.');
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    alert('Ocurrió un error al iniciar sesión. Intente más tarde.');
  }
};

/**
 * Navega después del login según el rol del usuario.
 */
const navegarDespuesLogin = () => {
  if (authStore.isAdmin) {
    router.push('/admin');
  } else {
    router.push('/');
  }
};

/**
 * Navega a la vista de registro.
 */
const registrar = () => {
  router.push('/registrar/nuevo');
};
</script>

  // export default {
  //   name: 'LoginView',
  //   data() {
  //     return {
  //       username: '',
  //       password: '',
  //       remember: false
  //     }
  //   },
  //   methods: {
  //     handleLogin() {
  //       console.log('Login attempt:', {
  //         username: this.username,
  //         password: this.password,
  //         remember: this.remember
  //       });
  //     }
  //   }
  // }

 