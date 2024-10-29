<template>
    <form @submit.prevent="calcularYGuardar">
      <div class="form-group">
        <label>Descripción</label>
        <input type="text" v-model="proyecto.descripcion" class="form-control" />
      </div>
      <div class="form-group">
        <label>Ancho (cm)</label>
        <input type="number" v-model="proyecto.ancho" class="form-control" />
      </div>
      <div class="form-group">
        <label>Alto (cm)</label>
        <input type="number" v-model="proyecto.alto" class="form-control" />
      </div>
      <div class="form-group">
        <label>Grosor (cm)</label>
        <input type="number" v-model="proyecto.grosor" class="form-control" />
      </div>
      <div class="form-group">
        <label>Cantidad de Colores</label>
        <input type="number" v-model="proyecto.cantColores" class="form-control" />
      </div>
      <div class="form-group">
        <label>Cantidad de Unidades</label>
        <input type="number" v-model="proyecto.cantidad" class="form-control" />
      </div>
      <div class="form-group">
        <label>Tipo</label>
        <select v-model="proyecto.tipo" class="form-control">
          <option disabled value="">Selecciona un tipo</option>
          <option value="Imán">Imán</option>
          <option value="Llavero">Llavero</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Calcular y Guardar</button>
    </form>
  </template>
  
  <script>
  import { useProyectosStore } from '../stores/ProyectosStore';
  
  export default {
    setup() {
      const proyectosStore = useProyectosStore();
      const proyecto = proyectosStore.proyectoActual;
  
      const calcularYGuardar = () => {
        proyectosStore.calcularCostoUnitario();
        proyectosStore.calcularCostoTotal();
        proyectosStore.agregarProyecto();
      };
  
      return { proyecto, calcularYGuardar };
    },
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  </style>