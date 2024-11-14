<template>
    <nav :class="{'navbar-scrolled': isScrolled}" class="navbar navbar-expand-lg navbar-light sticky-top">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img src="/src/images/Logo_trans.png" width="40" height="40" alt="Logo">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="navbar-nav ms-auto">
                    <li>
                        <router-link :class="{'nav-link-scrolled': isScrolled}" class="nav-link" to="/">
                            <div class="icon-text">
                                <img :class="{'nav-icon-scrolled': isScrolled}" src="/src/images/home.png" alt="Home" class="nav-icon"> Home
                            </div>
                        </router-link>
                    </li>
                    <li v-if="authStore.isAuthenticated && authStore.isAdmin">
                        <router-link :class="{'nav-link-scrolled': isScrolled}" class="nav-link" to="/admin">
                            <div class="icon-text">
                                <img :class="{'nav-icon-scrolled': isScrolled}" src="/src/images/home.png" alt="Informe" class="nav-icon"> Informe
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :class="{'nav-link-scrolled': isScrolled}" class="nav-link" to="/cotizador">
                            <div class="icon-text">
                                <img :class="{'nav-icon-scrolled': isScrolled}" src="/src/images/cot.png" alt="Cotizador" class="nav-icon"> Cotizador
                            </div>
                        </router-link>
                    </li>
                    <li v-if="authStore.isAuthenticated">
                        <router-link :class="{'nav-link-scrolled': isScrolled}" class="nav-link" to="/perfil">
                            <div class="icon-text">
                                <img :class="{'nav-icon-scrolled': isScrolled}" src="/src/images/profile.png" alt="Perfil" class="nav-icon"> Perfil
                            </div>
                        </router-link>
                    </li>
                    <li v-if="!authStore.isAuthenticated">
                        <router-link :class="{'nav-link-scrolled': isScrolled}" class="nav-link" to="/login">
                            <div class="icon-text">
                                <img :class="{'nav-icon-scrolled': isScrolled}" src="/src/images/profile.png" alt="Login" class="nav-icon"> Login
                            </div>
                        </router-link>
                    </li>
                    <li v-if="authStore.isAuthenticated" @click="logout">
                        <router-link :class="{'nav-link-scrolled': isScrolled}" class="nav-link" to="/">
                            <div class="icon-text">
                                <img :class="{'nav-icon-scrolled': isScrolled}" src="/src/images/logout.png" alt="Cerrar Sesión" class="nav-icon"> Cerrar Sesión
                            </div>
                        </router-link>
                    </li>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useAuthStore } from '../stores/index.js';

const authStore = useAuthStore();
const isScrolled = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50; 
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

const logout = () => {
    authStore.logout();
};
</script>

<style scoped>
.navbar {
    background-color: var(--primary-color); 
    padding: 5px 0; 
    min-height: 50px; 
    transition: background-color 0.3s ease; /* Transición suave */
}

.navbar-scrolled {
    background-color: black; /* Color cuando se hace scroll */
}

.navbar-brand {
    padding: 0; 
    margin: 0; 
}

.navbar-brand img {
    width: 55px; 
    height: 50px;
    padding: 0; 
    margin: 0; 
}

.navbar-nav .nav-link {
    color: #000; 
    font-weight: bold;
    font-size: 15px; 
    text-transform: uppercase;
    margin-right: 10px;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: #00000080; 
}
.nav-link-scrolled {
    color: var(--primary-color) !important; /* Color de los enlaces cuando se hace scroll */
}

.nav-icon {
    width: 1em; /* Tamaño ajustado al tamaño del texto */
    height: 1em;
    margin-right: 5px; /* Espacio entre el icono y el texto */
    transition: filter 0.3s ease;
}

.nav-icon-scrolled {
    filter: invert(50%) sepia(95%) saturate(650%) hue-rotate(0deg) brightness(90%) contrast(95%);
}



/* Contenedor del icono y el texto */
.icon-text {
    display: inline-flex; /* Alinea el ícono y el texto en línea */
    align-items: baseline; /* Alinea la base del texto e ícono */
    line-height: 1; /* Asegura que el contenedor tenga la altura del texto */
}
</style>
