<template>
    <div class="container text-center my-5">
        <h1 class="display-4 mb-4">Bienvenido a nuestro Calculador de Proyectos de Impresión 3D</h1>
        <p class="lead mb-4">Aquí podrás calcular el costo y ordenar tus proyectos de impresión 3D.</p>
        
    </div>
    <div>
        <router-link to="/cotizador" class="btn btn-secondary btn-lg">NUEVA COTIZACIÓN</router-link>
    </div>
</template>

<script setup>
</script>

<style scoped>
.container {
    background-color: #0e0d0c; /* Color de fondo claro */
    border-radius: 8px; /* Bordes redondeados */
    box-shadow: 0 4px 8px rgba(134, 130, 130, 0.2); /* Sombra suave */
    padding: 40px; /* Espaciado interno */
    background-image: url('../images/pacman.png'); /* Cambia la ruta a la imagen que elijas */
    background-repeat: repeat; /* Repetir la imagen */
    background-size: 130px 130px; /* Ajustar automáticamente el tamaño */
}

body {
    background-image: url('../images/Logo_Naranja.jpeg'); /* Cambia la ruta a la imagen que elijas */
    background-repeat: repeat; /* Repetir la imagen */
    background-size: auto; /* Ajustar automáticamente el tamaño */
}

h1 {
    color: var(--primary-color); /* Color del encabezado */
    font-weight: bold; /* Hacer el texto en negrita */
    text-shadow: 2px 2px 4px rgba(18, 17, 17, 0.975); /* Sombra de texto */
    text-transform: uppercase;
    font-size: 40px;
}

p {
    color: #fffafa; /* Color del texto */
    font-weight: bold; /* Hacer el texto en negrita */
    text-shadow: 1px 1px 3px rgba(3, 3, 3, 0.7); /* Sombra de texto */
    text-transform: uppercase;
}

/* Centrando y ajustando el botón */
div > .btn-secondary {
    display: block; /* Hacer el botón un elemento de bloque para centrarlo */
    margin: 2rem auto; /* Centrar el botón horizontalmente y agregar margen */
    padding: 15px 30px; /* Hacer el botón más grande */
    background-color: black;
    color: var(--primary-color);
    font-weight: 800;
    font-size: 20px; /* Incrementar el tamaño del texto */
    border-radius: 8px; /* Bordes redondeados */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5); /* Sombra para resaltarlo */
    width: 20%;
}

.btn-secondary:hover {
    background-color: #333333ce; /* Cambiar el color al pasar el cursor */
    transform: scale(1.05); /* Hacer un pequeño zoom */
    transition: all 0.2s ease-in-out; /* Animación suave */
    color: var(--primary-color);
}
</style>
