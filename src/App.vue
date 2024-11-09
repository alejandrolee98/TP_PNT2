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
    background-image: url('@/images/tu-imagen.png'); 
    background-repeat: repeat; 
    background-size: auto; 
    height: 100%; 
    margin: 0; 
}
</style>