<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar />
    <div class="flex-grow-1">
      <div class="container-fluid mt-0 p-0">

        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
.bg-image {
    background-image: url('@/images/tu-imagen.png'); /* Cambia 'tu-imagen.png' por el nombre real de tu imagen */
    background-repeat: repeat; /* Repetir la imagen */
    background-size: auto; /* Ajustar automáticamente el tamaño */
    height: 100%; /* Asegúrate de que el contenedor tenga altura completa */
    margin: 0; /* Eliminar márgenes */
}
</style>