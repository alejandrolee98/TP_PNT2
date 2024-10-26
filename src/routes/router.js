import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import cotizador from '../views/cotizador.vue';
import perfil from '../views/perfil.vue';
import login from '../views/login.vue';


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/cotizador', name: 'cotizador', component: cotizador },
    { path: '/perfil', name: 'Perfil', component: perfil },
    { path: '/login', name: 'Login', component: login },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;