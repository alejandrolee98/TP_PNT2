<template>
    <div class="container">
      <h2>Detalle del Proyecto</h2>
      <dl class="row details-info">
        <dt class="col-sm-3">Descripción</dt>
        <dd class="col-sm-9">{{ proyecto.descripcion }}</dd>
        
        <dt class="col-sm-3">Ancho</dt>
        <dd class="col-sm-9">{{ proyecto.ancho }} cm</dd>
        
        <dt class="col-sm-3">Alto</dt>
        <dd class="col-sm-9">{{ proyecto.alto }} cm</dd>
        
        <dt class="col-sm-3">Grosor</dt>
        <dd class="col-sm-9">{{ proyecto.grosor }} cm</dd>
        
        <dt class="col-sm-3">Cantidad de Colores</dt>
        <dd class="col-sm-9">{{ proyecto.cantColores }}</dd>
        
        <dt class="col-sm-3">Cantidad de Unidades</dt>
        <dd class="col-sm-9">{{ proyecto.cantidad }}</dd>
        
        <dt class="col-sm-3">Tipo</dt>
        <dd class="col-sm-9">{{ proyecto.tipo }}</dd>
        
        <dt class="col-sm-3">Costo Unitario</dt>
        <dd class="col-sm-9"><strong>{{ proyecto.costoUnitario | currency }}</strong></dd>
        
        <dt class="col-sm-3">Costo Total</dt>
        <dd class="col-sm-9"><strong>{{ proyecto.costoTotal | currency }}</strong></dd>
      </dl>
      <div class="text-center">
        <button class="btn btn-secondary" @click="volverCotizador">Volver al Cotizador</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useProyectosStore } from '../stores/ProyectosStore';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const proyectosStore = useProyectosStore();
      const router = useRouter();
      const proyecto = proyectosStore.proyectoActual;
  
      const volverCotizador = () => {
        router.push({ name: 'CotizadorView' });
      };
  
      return { proyecto, volverCotizador };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  .details-info dt {
    font-weight: bold;
  }
  .details-info dd {
    margin-bottom: 10px;
  }
  </style>