import { defineStore } from 'pinia';

export const useUsuariosStore = defineStore('usuariosStore', {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    async login(userData) {
      // Simulación de la autenticación asincrónica
      return new Promise((resolve) => {
        setTimeout(() => {
          if (userData.username === 'usuario' && userData.password === '1234') {
            this.user = userData;
            this.isLoggedIn = true;
            resolve(true); // Login exitoso
          } else {
            resolve(false); // Fallo de autenticación
          }
        }, 1000); // Simula un retraso de 1 segundo
      });
    },
    
    logout() {
      this.user = null;
      this.isLoggedIn = false;
    },
  },
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.isLoggedIn,
  },
});