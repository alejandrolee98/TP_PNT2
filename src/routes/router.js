import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import Cotizador from '../components/Cotizador.vue';
import Perfil from '../components/Perfil.vue';
import Login from '../components/Login.vue';


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/cotizador', name: 'Cotizador', component: Cotizador },
    { path: '/perfil', name: 'Perfil', component: Perfil },
    { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;