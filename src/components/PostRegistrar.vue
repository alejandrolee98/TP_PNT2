<template>
  <div class="registrar container">
    <h1>{{ isEdit ? "Actualizar usuario" : "Crear nuevo usuario" }}</h1>
    <form @submit.prevent="handleFormSubmit">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          v-model="form.nombre"
          class="form-control"
          id="nombre"
          placeholder="Ingrese su nombre"
          required
        />
      </div>
      <div class="mb-3">
        <label for="apellido" class="form-label">Apellido</label>
        <input
          type="text"
          v-model="form.apellido"
          class="form-control"
          id="apellido"
          placeholder="Ingrese su apellido"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          v-model="form.email"
          class="form-control"
          id="email"
          placeholder="usuario@ejemplo.com"
          required
        />
      </div>
      <div class="mb-3">
        <label for="pass" class="form-label">Contraseña</label>
        <input
          type="password"
          v-model="form.pass"
          class="form-control"
          id="pass"
          placeholder="Contraseña"
          required
        />
      </div>
      <div class="mb-3">
        <label for="direccion" class="form-label">Dirección</label>
        <input
          type="text"
          v-model="form.direccion"
          class="form-control"
          id="direccion"
          placeholder="Dirección"
          required
        />
      </div>
      <div class="mb-3">
        <label for="localidad" class="form-label">Localidad</label>
        <input
          type="text"
          v-model="form.localidad"
          class="form-control"
          id="localidad"
          placeholder="Localidad"
          required
        />
      </div>
      <div class="mb-3">
        <label for="cp" class="form-label">Código Postal</label>
        <input
          type="number"
          v-model="form.cp"
          class="form-control"
          id="cp"
          placeholder="Código postal"
          required
        />
      </div>
      <div class="mb-3">
        <label for="provincia" class="form-label">Provincia</label>
        <input
          type="text"
          v-model="form.provincia"
          class="form-control"
          id="provincia"
          placeholder="Provincia"
          required
        />
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-start">
        <button class="btn btn-primary me-md-2" type="submit">
          {{ isEdit ? "Actualizar" : "Registrarme" }}
        </button>
        <button class="btn btn-danger" type="button" @click="cancelar">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import userService from "../services/userService"; // Importar el servicio centralizado

const form = ref({
  nombre: "",
  apellido: "",
  role: "user",
  email: "",
  pass: "",
  direccion: "",
  localidad: "",
  cp: "",
  provincia: "",
});

const router = useRouter();
const route = useRoute();
const isEdit = ref(false);

/**
 * Cargar datos del usuario si está en modo edición.
 */
onMounted(async () => {
  if (route.params.id) {
    isEdit.value = true;
    try {
      form.value = await userService.obtenerUsuarioPorId(route.params.id);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
    }
  }
});

/**
 * Manejar la lógica del formulario.
 */
const handleFormSubmit = async () => {
  try {
    if (isEdit.value) {
      await userService.actualizarUsuario(route.params.id, form.value);
      router.push("/perfil");
    } else {
      await userService.crearUsuario(form.value);
      router.push("/login");
    }
  } catch (error) {
    console.error("Error al enviar formulario:", error);
    alert("Ocurrió un error. Intente nuevamente.");
  }
};

/**
 * Cancelar y volver a la vista principal.
 */
const cancelar = () => {
  router.push("/");
};
</script>

<style scoped>
  .form-control {
    color: var(--primary-color); /* Color del texto del select */
    border: 1px solid var(--primary-color); /* Borde del select */
    font-size: 1.1rem;
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
    color: black;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 0;
  }
  h1 {
    font-size: var(--h1-size);
  }
  button {
    background-color: var(--primary-color) !important;
    border-color:  var(--primary-color);
    font-weight: bold;
    margin-top: 1rem;
    font-size: 0.9rem;
  }
  button:hover {
    background-color: var(--primary-color-hover) !important;
    border-color: var(--primary-color-hover);
    font-weight: bold;
  }
</style>