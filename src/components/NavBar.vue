<template>
    <nav class="navbar navbar-expand-lg navbar-light sticky-top">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img src="/src/images/Logo_trans.png" width="80" height="80" alt="Logo">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="navbar-nav ms-auto">
                    <li><router-link class="nav-link" to="/">Home</router-link></li>
                    <li><router-link class="nav-link" to="/cotizador">Cotizador</router-link></li>
                    <li v-if ="isAuthenticated"><router-link class="nav-link" to="/perfil">Perfil</router-link></li>
                    <li v-if ="!isAuthenticated"><router-link class="nav-link" to="/login">Iniciar Sesión</router-link></li>
                    <li v-if ="isAuthenticated" @click="logout"><router-link class="nav-link" to="/">Cerrar Sesión</router-link></li>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useAuthStore } from '../stores';
const logout = ()=>{
    useAuthStore().logout;
}
</script>

<style scoped>
.navbar {
    background-color: var(--primary-color); 
    padding-bottom: 0%;
    padding-top: 0%;
}
.navbar-brand img {
    padding-top: 0px; 
    padding-bottom: 0px;
}
.navbar-nav .nav-link {
    color: #000; 
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
    margin-right: 10px;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: #00000080; 
}
</style>
