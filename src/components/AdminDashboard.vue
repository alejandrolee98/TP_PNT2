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
              <td>{{ formatCurrency(getAcumuladoCostos(users.proyecto)) }}</td>
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

const formatCurrency = (value) => {
    return `$ ${value.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

onMounted(() => {
  fetchUsuario();
});

</script>

<style>
h2 {
    font-size: var(--h2-size) !important;
    color: var(--primary-color) !important;
    
}
.card {
    background-color: rgb(0, 0, 0) !important;
    color: rgb(231, 224, 219);
    padding: 1rem;
    margin: 1rem;
}
.card-body{
    margin-top: 0;
}
.informeAdmin {
    margin-top: 1rem !important;
}

.panelInforme {
    margin-top: 3rem;
    background-color: black; /* Fondo negro */
    border-radius: 8px; /* Bordes redondeados */
    padding: 15px; /* Espaciado interno */
    color: white; /* Texto blanco */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5); /* Sombra */
}

.card-header {
    
    color: black; /* Texto negro */
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    padding: 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
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
    border: 1px solid #333; 
}

th {
    background-color: var(--primary-color); 
    color: black;
    font-weight: bold;
    font-size: 1.1rem;
    text-align: center !important; 
    text-transform: uppercase;
}

tr:nth-child(even) {
    background-color: #f9f9f91c; /* Fondo oscuro para filas pares */
}

tr:nth-child(odd) {
    background-color: black; /* Fondo negro para filas impares */
}

tr:hover {
    background-color: #333; /* Fondo más claro al pasar el ratón */
}

td {
    color: white;
    text-align: center; /* Centrar contenido en celdas */
    font-size: 1.1rem;
}

.card-body {
    padding: 15px; /* Espaciado interno */
}


</style>