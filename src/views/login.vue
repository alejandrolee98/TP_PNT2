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
 
            <!-- Login button -->
            <button
              type="submit"
              class="login btn btn-lg w-100"
              style="background-color: var(--primary-color); color: white;"
              @click ="login"
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
 
  <script setup>
    import { useAuthStore } from '../stores';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const router = useRouter();

    const login = async () => {
      await authStore.login(email.value, password.value);
      if(authStore.isAuthenticated){
        if (authStore.isAdmin) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }
}

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
  </script>
 
  <style scoped>
  .form-control-lg {
    font-size: 0.9rem;
  }
  .form-control:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.25rem rgba(255, 107, 0, 0.25);
  }
 
  .form-check-input:checked {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }
  .btn {
    transition: background-color 0.3s ease;
  }
  .btn:hover {
    background-color: var(--primary-color-hover) !important;
  }
  button.login {
    font-weight:bold;
  }
  h1 {
    font-size: var(--h1-size);
  }
  </style>