<template>
  <div class="container">
    <div class="card">
      <div class="card-header" v-if="authStore.isAuthenticated">
        <h1>Proyecto Cotizado</h1>
      </div>
      <div class="card-body">
        <div v-if="proyecto">
          <h6>Descripción: {{ proyecto.descripcion }}</h6>
          <h6>DIMENSIONES</h6>
          <h6>Ancho: {{ proyecto.ancho }} cm x Alto: {{ proyecto.alto }} cm x Grosor: {{ proyecto.grosor }} cm</h6>
          <h6>Tipo: {{ proyecto.tipo }}</h6>
          <h6>Material: {{ proyecto.material }}</h6>
          <h6>Cantidad de colores: {{ proyecto.cantidadColores }}</h6>
          <h6>Cantidad: {{ proyecto.cantidad }}</h6>
          <h6>Costo por unidad: ${{ proyecto.costoUnitario.toFixed(2)}} </h6>
          <h6>COSTO TOTAL: ${{ proyecto.costoTotal.toFixed(2) }}</h6>
        </div>
        <button class="btn btn-primary" @click="editarProyecto">Editar datos</button>
        <button class="btn btn-danger" @click="eliminarProyecto">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores';

const authStore = useAuthStore();
const route = useRoute();
const proyecto = ref(null);
const router = useRouter();

// Obtener el proyecto usando el userId y proyectoId
const fetchProyecto = async () => {
  const userId = authStore.user.id;
  const proyectoId = route.params.proyectoId; // Obtener el proyectoId de la ruta

  if (!userId || !proyectoId) {
    console.error("User ID o Proyecto ID no están definidos");
    return;
  }

  try {
    const response = await axios.get(
      `https://672aac89976a834dd0240f81.mockapi.io/api/users/${userId}/proyecto/${proyectoId}`
    );
    proyecto.value = response.data;
  } catch (error) {
    console.error('Error al recuperar el proyecto:', error);
  }
};

//Editar
const editarProyecto = () => {
  router.push({
    name: 'cotizador',
    query: {
      proyectoId: proyecto.value.id, // Incluye el ID del proyecto
      descripcion: proyecto.value.descripcion,
      ancho: proyecto.value.ancho,
      alto: proyecto.value.alto,
      grosor: proyecto.value.grosor,
      tipo: proyecto.value.tipo,
      material: proyecto.value.material,
      cantidadColores: proyecto.value.cantidadColores,
      cantidad: proyecto.value.cantidad
    }
  });
};

// Eliminar
const eliminarProyecto = async () => {
  const userId = authStore.user.id;
  const proyectoId = route.params.proyectoId;

  if (!userId || !proyectoId) {
    console.error('userId o proyectoId no definidos');
    return;
  }

  try {
    await axios.delete(
      `https://672aac89976a834dd0240f81.mockapi.io/api/users/${userId}/proyecto/${proyectoId}`
    );
    alert('Proyecto eliminado');
    router.push('/cotizador'); // Redirigir a la lista de proyectos después de eliminar
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
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

