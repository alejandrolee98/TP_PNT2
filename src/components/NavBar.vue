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
                    <router-link class="nav-link" to="/">Home</router-link>
                    <router-link class="nav-link" to="/cotizador">Cotizador</router-link>
                    <router-link class="nav-link" to="/perfil">Perfil</router-link>
                    <router-link class="nav-link" to="/login">Login</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    background-color: var(--primary-color); /* Usando variable CSS */
}
.navbar-brand img {
    padding-top: 1px; 
    padding-bottom: 1px;
}
.navbar-nav .nav-link {
    color: #000; /* Color del texto */
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
    margin-right: 10px;
    transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: #00000080; /* Color al pasar el mouse */
}
</style>
