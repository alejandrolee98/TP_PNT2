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
                        <tr v-for="users in usuarios" :key="users.id">
                            <td>{{ users.id }}</td>
                            <td>{{ users.nombre }}</td>
                            <td>{{ users.proyecto.length }}</td>
                            <td>$ {{ getAcumuladoCostos(users.proyecto) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </template>

<script setup>
import {ref,onMounted} from 'vue';
import axios from 'axios';

const usuarios = ref([]);
const datosInforme = ref([]);

const fetchUsuario = async () =>{
    try {
        const response = await axios.get(`https://6721850698bbb4d93ca89e32.mockapi.io/api/users/`);
        const usuario = response.data;
        const proyectosCadaUsuario = usuario.map(async user=>{
            const projectResponse = await axios.get(`https://6721850698bbb4d93ca89e32.mockapi.io/api/users/${user.id}/proyecto`);
            return { 
                ...user,
                proyecto: projectResponse.data || [],
            };
        });
        datosInforme.value = proyectosCadaUsuario;

        Promise.all(proyectosCadaUsuario)
            .then(usuariosConDatosProyecto => {
              usuarios.value = usuariosConDatosProyecto;
            });
        
    } catch (error) {
        console.error('Error en llamada a usuario',error);
    }
}

const getAcumuladoCostos=(proyecto)=>{
    return (proyecto || []).reduce((total, proyecto)=> total + proyecto.costoTotal,0);
}

onMounted(()=>{
    fetchUsuario();
})

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