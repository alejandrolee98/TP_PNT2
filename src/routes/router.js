import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/index.js';

import Home from '../components/Home.vue';
import cotizador from '../views/cotizador.vue';
import perfil from '../views/perfil.vue';
import login from '../views/login.vue';
import detalleProyecto from '../views/detalleProyecto.vue';
import informe from '../views/informe.vue';
import PostRegistrar from '../components/PostRegistrar.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/cotizador', name: 'cotizador', component: cotizador },
    { path: '/perfil', name: 'Perfil', component: perfil },
    { path: '/login', name: 'Login', component: login },
    { path: '/detalleProyecto/:proyectoId', name: 'Detalle', component: detalleProyecto }, // Ruta con parámetro proyectoId
    { path: '/admin', name:'Informe', component: informe, meta: {requiereAuth: true, role: 'admin' } },
    { path: '/registrar/nuevo', name:'Registrar', component: PostRegistrar },
    { path: '/registrar/editar/:id', name:'Editar', component: PostRegistrar },

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