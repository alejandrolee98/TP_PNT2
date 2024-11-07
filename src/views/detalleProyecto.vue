<template>
  <div class="container">
    <div class="card">
      <div class="card-header" v-if="authStore.isAuthenticated">
        <h1>Proyectos de {{ authStore.user.nombre }}</h1>
      </div>
      <div class="card-body">
        <div v-if="proyecto">
          <h6>Descripción del proyecto: {{ proyecto.descripcion }}</h6>
          <h6>Dimensiones: {{ proyecto.ancho }} x {{ proyecto.alto }} x {{ proyecto.grosor }}</h6>
          <h6>Tipo: {{ proyecto.tipo }}</h6>
          <h6>Material: {{ proyecto.material }}</h6>
          <h6>Cantidad de colores: {{ proyecto.cantidadColores }}</h6>
          <h6>Cantidad: {{ proyecto.cantidad }}</h6>
          <h6>Costo total: {{ proyecto.costoTotal.toFixed(2) }}</h6>
        </div>
        <button class="btn btn-primary">Editar datos</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores';

const authStore = useAuthStore();
const route = useRoute();
const proyecto = ref(null);

// Obtener el proyecto usando el userId y proyectoId
const fetchProyecto = async () => {
  const userId = authStore.user.id;
  const proyectoId = route.params.proyectoId; // Obtener el proyectoId de la ruta

  try {
    const response = await axios.get(
      `https://672aac89976a834dd0240f81.mockapi.io/api/users/${userId}/proyecto/${proyectoId}`
    );
    proyecto.value = response.data;
  } catch (error) {
    console.error('Error al recuperar el proyecto:', error);
  }
};

onMounted(() => {
  fetchProyecto();
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
</style>