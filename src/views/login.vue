<template>
    <div class="bg-black min-vh-100 d-flex flex-column align-items-center pt-5">
      <div class="card bg-transparent border-0" style="width: 400px;">
        <div class="card-body">
          <h1 class="text-white text-center mb-4">LOGIN</h1>
          <form @submit.prevent="handleLogin">
            <!-- Username -->
            <div class="mb-3">
              <input
                type="text"
                class="form-control form-control-lg bg-light"
                placeholder="Username"
                v-model="username"
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
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
 
  <script>
  export default {
    name: 'LoginView',
    data() {
      return {
        username: '',
        password: '',
        remember: false
      }
    },
    methods: {
      handleLogin() {
        console.log('Login attempt:', {
          username: this.username,
          password: this.password,
          remember: this.remember
        });
      }
    }
  }
  </script>
 
  <style scoped>
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
  
  </style>