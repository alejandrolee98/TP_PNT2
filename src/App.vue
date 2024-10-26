<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar />
    <div class="flex-grow-1">
      <div class="container-fluid mt-4">
        <br />
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue';
</script>
