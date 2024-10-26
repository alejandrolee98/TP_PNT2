<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="nav-link" to="/">
            <img src="../images/Logo_Naranja.jpeg" width="50" height="50" alt="" loading="lazy">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <router-link class="nav-link" to="/">Home</router-link>
                <router-link class="nav-link" to="/cotizador">Cotizador </router-link>
                <router-link class="nav-link" to="/perfil">Perfil </router-link>
                <router-link class="nav-link" to="/login">Login </router-link>
            </div>
        </div>
    </nav>
</template>

<style scope>
nav{
    background-color: rgb(255, 140, 0);
}
.navbar-nav{
    font-weight:bold;
}
</style>