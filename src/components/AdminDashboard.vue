<template>
    <div class="card panelInforme">
      <div class="card-header">
        <h1>Informe de usuarios</h1>
      </div>
      <div class="card-body informeAdmin">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Cantidad de Proyectos</th>
              <th>Monto total de Proyectos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in usuarios" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.proyecto.length }}</td>
              <td>$ {{ getAcumuladoCostos(user.proyecto) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import userService from '../services/userService'; // Importación del servicio

const usuarios = ref([]);
const fetchUsuario = async () => {
  try {
    // Llamar al servicio modularizado
    usuarios.value = await userService.fetchUsuariosConProyectos();
  } catch (error) {
    console.error('Error en fetchUsuario:', error);
  }
};

const getAcumuladoCostos = (proyecto) => {
  return (proyecto || []).reduce((total, proyecto) => total + proyecto.costoTotal, 0);
};

onMounted(() => {
  fetchUsuario();
});
</script>

<style>
.informeAdmin {
    margin-top: 1rem !important;
}

.panelInforme, .panelDatos {
    margin-top: 3rem;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    font-size: 14px;
    text-align: left;
}

th, td {
    padding: 8px;
    border: 1px solid #ddd;
}

th {
    background-color: #f4f4f4;
    font-weight: bold;
}


td:first-child, th:first-child {
    text-align: left;
}

td:nth-child(2), th:nth-child(2) {
    text-align: left;
}

td:nth-child(3), th:nth-child(3) {
    text-align: right;
}

/* Centrar los botones en la columna de acciones */
td:last-child, th:last-child {
    text-align: center;
}

/* Contenedor de botones alineados al centro */
.actions-container {
    display: flex;
    justify-content: center;
    gap: 8px;
}

/* Estilo de filas alternadas */
tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #f1f1f1;
}

</style>