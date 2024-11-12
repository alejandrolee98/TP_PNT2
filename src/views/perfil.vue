<template>
    <div class="container">
        <div class="card panelDatos">
            <div class="card-header" v-if="authStore.isAuthenticated">
                <h1>Perfil de {{authStore.user.nombre}}</h1> <!--agregar el nombre recuperando el id-->
            </div>
            <div class="card-body editarDatos">
                <!--agregar datos recuperando el id-->
                <h6>Nro de cliente: {{authStore.user.id}}</h6>
                <h6>Nombre: {{authStore.user.nombre}}</h6>
                <h6>Apellido: {{authStore.user.apellido}}</h6>
                <h6>Email: {{authStore.user.email}}</h6>
                <h6>Dirección: {{authStore.user.direccion}}</h6>
                <h6>Localidad: {{authStore.user.localidad}}</h6>
                <h6>CP: {{authStore.user.cp}}</h6>
                <h6>Provincia: {{authStore.user.provincia}}</h6>
                <button @click="goToEdit(authStore.user.id)" class="btn btn-primary">Editar datos</button>
            </div>
            
        </div>
        <div class="card panelLista">
            <div class="card-header" v-if="authStore.isAuthenticated">
                <h1>Lista de proyectos</h1> 
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
                        <tr>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                            <td>
                                <button class="btn btn-edit">Ver detalle</button>
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
const authStore = useAuthStore();
const router = useRouter();

const goToEdit = (id) =>{
    router.push(`/registrar/editar/${id}`);
}
</script>


<style scoped>
.editarDatos, .listaProyecto {
    margin-top: 1rem !important;
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
    background-color: #4CAF50; /* Verde */
}

.btn-delete {
    background-color: #f44336; /* Rojo */
}

.btn-order {
    background-color: #008CBA; /* Azul */
}

.btn:hover {
    opacity: 0.8;
}
</style>
