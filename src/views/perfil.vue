<template>
    <div class="container">
        <div class="card">
            <div class="card-header" v-if="authStore.isAuthenticated">
                <h1>Bienvenido {{authStore.user.nombre}}</h1> <!--agregar el nombre recuperando el id-->
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
                <button @click="goToEdit(authStore.user.id)" class="btn btn-primary">Editar datos</button>
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