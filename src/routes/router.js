import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import cotizador from '../views/cotizador.vue';
import perfil from '../views/perfil.vue';
import login from '../views/login.vue';
import detalleProyecto from '../views/detalleProyecto.vue';


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/cotizador', name: 'cotizador', component: cotizador },
    { path: '/perfil', name: 'Perfil', component: perfil },
    { path: '/login', name: 'Login', component: login },
    { path: '/detalleProyecto', name: 'Detalle', component: detalleProyecto },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;