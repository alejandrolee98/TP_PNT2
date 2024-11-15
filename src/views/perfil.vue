<template>
    <div class="container">
        <div class="card panelDatos">
            <div class="card-header" v-if="authStore.isAuthenticated">
                <h2>Perfil de {{authStore.user.nombre}}</h2> <!--agregar el nombre recuperando el id-->
            </div>
            <div class="card-body">
                <!--agregar datos recuperando el id-->
                <h6>Nro de cliente: {{authStore.user.id}}</h6>
                <h6>Nombre: {{authStore.user.nombre}}</h6>
                <h6>Apellido: {{authStore.user.apellido}}</h6>
                <h6>Email: {{authStore.user.email}}</h6>
                <h6>Dirección: {{authStore.user.direccion}}</h6>
                <h6>Localidad: {{authStore.user.localidad}}</h6>
                <h6>CP: {{authStore.user.cp}}</h6>
                <h6>Provincia: {{authStore.user.provincia}}</h6>
                <button @click="goToEdit(authStore.user.id)" class="editarDatos btn btn-primary">Editar datos</button>
            </div>
            
        </div>
        <div class="card panelLista">
            <div class="card-header" v-if="authStore.isAuthenticated">
                <h2>Proyectos</h2> 
            </div>
            <div class="card-body listaProyecto">
                <table>
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Tipo</th>
                            <th>Costo Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="proyecto in proyectos" :key="proyecto.id">
                            <td>{{ proyecto.descripcion }}</td>
                            <td>{{ proyecto.tipo }}</td>
                            <td>{{ proyecto.costoTotal }}</td>
                            <td>

                                <button class="btn btn-edit" @click="goDetalle(proyecto.id)">Ver detalle</button>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores';

import { useRouter } from 'vue-router';
import {ref,onMounted} from 'vue';
import axios from 'axios';

const authStore = useAuthStore();
const router = useRouter();
const proyectos = ref([]);

const goToEdit = (id) =>{
    router.push(`/registrar/editar/${id}`);
}

const fetchProyecto = async () =>{
    try {
        const response = await axios.get(`https://6721850698bbb4d93ca89e32.mockapi.io/api/users/${authStore.user.id}/proyecto`);
        proyectos.value = response.data;
    } catch (error) {
        console.error('Error en el listado',error);
    }
}

const goDetalle = (id)=>{
    router.push(`/detalleProyecto/${id}`);
}

onMounted(()=>{
    fetchProyecto();
})

</script>

<style scoped>
.card {
    background-color: rgb(0, 0, 0);
    color: rgb(231, 224, 219);
    padding: 1rem;
}
.card-body{
    margin-top: 0;
}
h2 {
    font-size: var(--h2-size);
    color: var(--primary-color);
}
.editarDatos.btn.btn-primary {
    margin-top: 1rem;
    background-color: var(--primary-color);
}

.panelLista, .panelDatos {
    margin-top: 3rem;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    font-size: 14px;
    text-align: left;
    border-color: black !important;
}

th, td {
    padding: 8px;
    border: 1px solid #000000;
}

th {
    background-color: var(--primary-color);
    font-weight: bold;
    color: black;
}


td:first-child, th:first-child {
    text-align: center;
}

td:nth-child(2), th:nth-child(2) {
    text-align: center;
}

td:nth-child(3), th:nth-child(3) {
    text-align: center;
}

/* Centrar los botones en la columna de acciones */
td:last-child, th:last-child {
    text-align: center;
}

/* Contenedor de botones alineados al centro */
.actions-container {
    display: flex;
    justify-content: center;
    gap: 15px;
}

/* Estilo de filas alternadas */
tr:nth-child(even) {
    background-color: #f9f9f938;
}

tr:hover {
    background-color: #f1f1f138;
}

/* Estilos de los botones */
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin: 0 2px;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    cursor: pointer;
    text-align: center;
}

.btn-edit {
    background-color: #4caf4fa1; /* Verde */
}

.btn-delete {
    background-color: #f443367c; /* Rojo */
}

.btn:hover {
    opacity: 0.8;
}
</style>