import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/index.js';

import Home from '../components/Home.vue';
import cotizador from '../views/cotizador.vue';
import perfil from '../views/perfil.vue';
import login from '../views/login.vue';
import detalleProyecto from '../views/detalleProyecto.vue';
import AdminDashboard from '../components/AdminDashboard.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/cotizador', name: 'cotizador', component: cotizador },
    { path: '/perfil', name: 'Perfil', component: perfil },
    { path: '/login', name: 'Login', component: login },
    { path: '/detalleProyecto/:proyectoId', name: 'Detalle', component: detalleProyecto }, // Ruta con parámetro proyectoId
    { path: '/admin', name:'Admin', component: AdminDashboard, meta: {requiereAuth: true, role: 'admin' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
  
    if (to.meta.requiereAuth && !authStore.isAuthenticated) {
      next({ name: 'login' })
    }else if (to.meta.role && !authStore.isAdmin) {
      next({ name: 'login' })
    } else {
      next()
    }
})

export default router;