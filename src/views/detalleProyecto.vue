<template>
  <div class="container">
    <div class="card">
      <div class="card-header" v-if="authStore.isAuthenticated">
        <h1>PROYECTO COTIZADO</h1>
      </div>
      <div class="card-body">
        <div v-if="proyecto">
          <table class="details-table">
            <tbody>
              <tr>
                <td class="detail-title">Descripción:</td>
                <td class="detail-value">{{ proyecto.descripcion }}</td>
              </tr>
              <tr>
                <td class="detail-title">Dimensiones:</td>
                <td class="detail-value">
                  {{ proyecto.ancho }} cm x {{ proyecto.alto }} cm x {{ proyecto.grosor }} cm
                </td>
              </tr>
              <tr>
                <td class="detail-title">Tipo:</td>
                <td class="detail-value">{{ proyecto.tipo }}</td>
              </tr>
              <tr>
                <td class="detail-title">Material:</td>
                <td class="detail-value">{{ proyecto.material }}</td>
              </tr>
              <tr>
                <td class="detail-title">Cantidad de colores:</td>
                <td class="detail-value">{{ proyecto.cantidadColores }}</td>
              </tr>
              <tr>
                <td class="detail-title">Cantidad:</td>
                <td class="detail-value">{{ proyecto.cantidad }}</td>
              </tr>
              <tr>
                <td class="detail-title">Costo por unidad:</td>
                <td class="detail-value">${{ proyecto.costoUnitario.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="summary-box">
            <table>
              <tbody>
                <tr>
                  <td class="summary-title">TOTAL:</td>
                  <td class="summary-value">${{ proyecto.costoTotal.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="button-container">
          <button class="btn btn-edit">Editar datos</button>
          <button class="btn btn-delete" @click="eliminarProyecto">Eliminar</button>
        </div>
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

h1 {
  font-size: 24px;
  color: #fca311; /* Color del encabezado */
}

.card {
  background-color: black;
  color: white;
  padding: 20px;
  border-radius: 8px;
}
.card-body {
  font-size: 1.3rem!important;
}
/* Tabla de detalles */
.details-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.details-table td {
  padding: 10px;
}

.detail-title {
  text-align: left;

  width: 50%;
}

.detail-value {
  text-align: right;
  font-weight: bold;
  text-transform: uppercase;
}

/* Caja resumen */
.summary-box {
  background-color: rgba(60, 60, 60, 0.8);
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.summary-box table {
  width: 100%;
  border-collapse: collapse;
}

.summary-box td {
  padding: 1px;
}

.summary-title {
  text-align: left;
}

.summary-value {
  text-align: right;
  font-weight: bold;
}

/* Botones */
.button-container {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.btn-edit {
  padding: 10px 15px;
  background-color: #236170;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-edit:hover {
  background-color: #23617096;
}

.btn-delete {
  padding: 6px 15px;
  background-color: #f44336be;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #f443368a;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end; /* Alinea los botones a la derecha */
  gap: 10px; /* Espaciado entre los botones */
}

</style>


