import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import Cotizador from '../views/cotizador.vue';
import DetalleProyectoView from '../views/DetalleProyectoView.vue';
import perfil from '../views/perfil.vue';
import login from '../views/login.vue';


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/cotizador', name: 'cotizador', component: Cotizador },
    { path: '/perfil', name: 'Perfil', component: perfil },
    { path: '/login', name: 'Login', component: login },
    { path: '/detalle-proyecto', name: 'DetalleProyectoView', component: DetalleProyectoView }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;