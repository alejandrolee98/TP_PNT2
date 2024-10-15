import { createRouter, createWebHistory } from 'tp-pnt';

import Home from './components/Home.vue';


const routes = [
    { path: '/', component: Home},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;