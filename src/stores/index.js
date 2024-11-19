import { defineStore } from "pinia";
import userService from "../services/userService";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const user = await userService.login(email, password); // Usa el servicio para autenticación

        if (user) {
          this.token = user.token;
          this.user = user;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', user.token);
        } else {
          console.error('Usuario no encontrado o credenciales inválidas');
          throw new Error('Credenciales inválidas');
        }
      } catch (error) {
        console.error('Error en login:', error);
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});