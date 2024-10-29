<template>
  <div class="container">
    <h1>Cotizador de Proyectos</h1>
    <FormularioCotizador @guardar-proyecto="guardarProyecto" />
  </div>
</template>

<script>
import FormularioCotizador from '../components/FormularioCotizador.vue';
import { useProyectosStore } from '../stores/ProyectosStore';
import { useRouter } from 'vue-router';

export default {
  components: { FormularioCotizador },
  setup() {
    const proyectosStore = useProyectosStore();
    const router = useRouter();

    const guardarProyecto = (proyectoData) => {
      proyectosStore.agregarProyecto(proyectoData);
      router.push({ name: 'DetalleProyectoView' });
    };

    return { guardarProyecto };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
</style>