<template>
    <div class="registrar container">
      <h1>Crear nuevo usuario</h1>
      <form @submit.prevent="crearNuevoUsuario" >
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input type="text" v-model="form.nombre" class="form-control" id="nombre" placeholder="Ingrese su nombre" required>
        </div>
        <div class="mb-3">
          <label for="apellido" class="form-label">Apellido</label>
          <input type="text" v-model="form.apellido" class="form-control" id="apellido" placeholder="Ingrese su apellido" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" v-model="form.email" class="form-control" id="email" placeholder="usuario@ejemplo.com" required>
        </div>
        <div class="mb-3">
          <label for="pass" class="form-label">Contraseña</label>
          <input type="password" v-model="form.pass" class="form-control" id="pass" placeholder="Contraseña" required>
        </div>
        <div class="mb-3">
          <label for="direccion" class="form-label">Dirección</label>
          <input type="text" v-model="form.direccion" class="form-control" id="direccion" placeholder="Dirección" required>
        </div>
        <div class="mb-3">
          <label for="localidad" class="form-label">Localidad</label>
          <input type="text" v-model="form.localidad" class="form-control" id="localidad" placeholder="Localidad" required>
        </div>
        <div class="mb-3">
          <label for="cp" class="form-label">Codigo Postal</label>
          <input type="number" v-model="form.cp" class="form-control" id="cp" placeholder="Codigo postal" required>
        </div>
        <div class="mb-3">
          <label for="provincia" class="form-label">Provincia</label>
          <input type="provincia" v-model="form.provincia" class="form-control" id="provincia" placeholder="Provincia" required>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button v-if="!authStore.isAuthenticated" class="btn btn-primary me-md-2" type="submit">Registrarme</button>
          <button v-if="authStore.isAuthenticated" class="btn btn-primary me-md-2" type="submit">Actualizar</button>
          <button class="btn btn-danger" type="button" @click="cancelar">Cancelar</button>
        </div>
      </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores';
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const form = ref ({
    nombre : '',
    apellido : '',
    email : '',
    pass : '',
    direccioin : '',
    localidad : '',
    cp : '',
    provincia : '',
})

const isEdit = ref(false)

onMounted(() => {
      if(route.params.id){
        isEdit.value = true;
        fetchPost()
     }
})

const fetchPost = async () => {
    const response = await axios.get(`https://6721850698bbb4d93ca89e32.mockapi.io/api/users/${route.params.id}`);
    form.value = response.data;
}


const crearNuevoUsuario = async () => {
    try {
        if(isEdit.value){
            await axios.put(`https://6721850698bbb4d93ca89e32.mockapi.io/api/users/${route.params.id}`, form.value);
            router.push('/perfil');
        }else{
            await axios.post('https://6721850698bbb4d93ca89e32.mockapi.io/api/users', form.value);
            router.push('/login');
        }   
    } catch (error) {
        console.error('Error post', error);
    }
}

const cancelar = () => {
    router.push('/')
  };
</script>

<style scoped>
  .form-control {
    background-color: rgba(55, 55, 55, 0.8); /* Fondo del select cerrado */
    color: var(--primary-color); /* Color del texto del select */
    border: 1px solid var(--primary-color); /* Borde del select */
    font-size: 0.9rem;
  }
  .container {
    max-width: 600px;
    margin-bottom: 2rem;
  }
  .registrar {
    margin-top: 4rem;
    margin-bottom: 5rem;
  }
  .registrar h1 {
    margin-bottom: 2rem;
    color: var(--primary-color);
    font-weight: bold;
    text-transform: uppercase;
  }
  .registrar label {
    color: white;
    font-size: 0.9rem;
  }
  h1 {
    font-size: var(--h1-size);
  }
  .btn-danger {
    background-color: var(--primary-color) !important;
    border-color:  var(--primary-color);
    font-weight: bold;
    margin-top: 1rem;
    font-size: 0.9rem;
  }
  .btn-danger:hover {
    background-color: var(--primary-color-hover) !important;
    border-color: var(--primary-color-hover);
    font-weight: bold;
  }
</style>