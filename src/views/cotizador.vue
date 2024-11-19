<template> 
    <div class="cotizador container">
      <h1>Cotizador</h1>
      <form @submit.prevent="calcularCostoTotal" >
        <div class="mb-3">
          <label for="descripcion" class="form-label">Descripcion</label>
          <input type="text" v-model="descripcion" class="form-control" id="descripcion" placeholder="Descripcion del producto" required>
        </div>
        <div class="mb-3">
          <label for="ancho" class="form-label">Ancho</label>
          <input type="number" v-model.number="ancho" class="form-control" id="ancho" placeholder="En centimetros" required>
        </div>
        <div class="mb-3">
          <label for="alto" class="form-label">Alto</label>
          <input type="number" v-model.number="alto" class="form-control" id="alto" placeholder="En centimetros" required>
        </div>
        <div class="mb-3">
          <label for="grosor" class="form-label">Grosor</label>
          <input type="number" v-model.number="grosor" class="form-control" id="grosor" placeholder="En centimetros" required>
        </div>
        
        <label for="tipo" class="form-label">Tipo</label> <!-- Despliega listado -->
        <select v-model="tipo" class="form-select form-select-lg mb-3" required>
          <option selected disabled>Elige un tipo</option>
          <option value="iman">Imán</option>
          <option value="figura">Figura</option>
          <option value="otro">Otro</option>
        </select>
  
        <label for="material" class="form-label">Material</label> <!-- Despliega listado -->
        <select v-model="material" class="form-select form-select-lg mb-3" required>
          <option selected disabled>Elige material</option>
          <option value="economico">Económico</option>
          <option value="premium">Premium</option>
          <option value="alimentos">Apto Alimentos</option>
        </select>
  
        <div class="mb-3">
          <label for="color" class="form-label">Cantidad de colores</label>
          <input type="number" v-model.number="cantidadColores" class="form-control" id="color" placeholder="0" required>
        </div>
  
        <div class="mb-3">
          <label for="cantidad" class="form-label">Cantidad</label>
          <input type="number" v-model.number="cantidad" class="form-control" id="cantidad" placeholder="0" required>
        </div>
  
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button v-if="authStore.isAuthenticated" class="btn btn-primary me-md-2" type="button" @click="guardarProyecto">Cotizar</button>
          <button v-if="!authStore.isAuthenticated" class="btn btn-primary me-md-2" type="button registro" @click="registrarme">Registrarme</button>
          <button class="borrar btn btn-danger" type="button" @click="cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores';
import projectService from '../services/projectService'; 

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Campos del formulario
const descripcion = ref('');
const ancho = ref(0);
const alto = ref(0);
const grosor = ref(0);
const tipo = ref('');
const material = ref('');
const cantidadColores = ref(0);
const cantidad = ref(1);
const costoTotal = ref(0);
const costoUnitario = ref(0);

const proyectoId = ref(null);
const materiales = { economico: 1.0, premium: 1.2, alimentos: 1.5 };

// Cargar datos de edición
onMounted(() => {
  proyectoId.value = route.query.proyectoId || null;
  descripcion.value = route.query.descripcion || '';
  ancho.value = parseFloat(route.query.ancho || 0);
  alto.value = parseFloat(route.query.alto || 0);
  grosor.value = parseFloat(route.query.grosor || 0);
  tipo.value = route.query.tipo || '';
  material.value = route.query.material || '';
  cantidadColores.value = parseInt(route.query.cantidadColores || 0);
  cantidad.value = parseInt(route.query.cantidad || 1);
});

// Cálculos
const calcularCostoBase = () => {
  const baseCostos = { iman: 50, figura: 100, otro: 75 };
  return baseCostos[tipo.value] || 0;
};

const calcularCosto = () => {
  const tamaño = ancho.value * alto.value * grosor.value;
  const costoPorColor = 20;
  costoUnitario.value = (calcularCostoBase() + tamaño * 0.1 + cantidadColores.value * costoPorColor) * materiales[material.value];
};

const calcularCostoTotal = () => {
  calcularCosto();
  costoTotal.value = costoUnitario.value * cantidad.value;
};

// Acciones
const cancelar = () => {
  descripcion.value = '';
  ancho.value = 0;
  alto.value = 0;
  grosor.value = 0;
  tipo.value = '';
  material.value = '';
  cantidadColores.value = 0;
  cantidad.value = 1;
  costoTotal.value = 0;
};

const guardarProyecto = async () => {
  if (!authStore.isAuthenticated) return console.warn('Usuario no autenticado');

  calcularCostoTotal();
  const projectData = {
    descripcion: descripcion.value,
    ancho: ancho.value,
    alto: alto.value,
    grosor: grosor.value,
    tipo: tipo.value,
    material: material.value,
    cantidadColores: cantidadColores.value,
    cantidad: cantidad.value,
    costoUnitario: costoUnitario.value,
    costoTotal: costoTotal.value,
  };

  try {
    const userId = authStore.user.id;
    if (proyectoId.value) {
      await projectService.actualizarProyecto(userId, proyectoId.value, projectData);
    } else {
      const response = await projectService.crearProyecto(userId, projectData);
      proyectoId.value = response.id;
    }
    cancelar();
    router.push({ name: 'Detalle', params: { proyectoId: proyectoId.value } });
  } catch (error) {
    console.error('Error al guardar proyecto:', error);
  }
};

const registrarme = () => router.push('/registrar/nuevo');
</script>
  
<style scoped>
  .form-select, .form-control {
    background-color: rgba(0, 0, 0, 0.819); /* Fondo del select cerrado */
    color: var(--primary-color); /* Color del texto del select */
    border: 1px solid var(--primary-color); /* Borde del select */
    font-size: 0.9rem;
  }

.form-select option {
    background-color: #333; /* Fondo de cada opción */
    color: var(--primary-color); /* Color de texto de cada opción */
    border: none; /* Elimina el borde blanco alrededor de la opción seleccionada */
  }

.form-select option:checked {
    background-color: #333; /* Fondo de la opción seleccionada */
    color: var(--primary-color); /* Color de texto de la opción seleccionada */
  }


.form-select option:hover {
    background-color: var(--primary-color); /* Fondo al pasar el cursor */
    color: black; /* Color del texto al pasar el cursor */
}
 
.container {
    max-width: 600px;
    margin-bottom: 2rem;
}
.cotizador {
    margin-top: 2rem;
    margin-bottom: 5rem;
}
.cotizador h1 {
    margin-bottom: 2rem;
    color: var(--primary-color);
    font-weight: bolder; 
    text-transform: uppercase;
    font-size: var(--h1-size);
}
.cotizador label {
    color: rgb(0, 0, 0);
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0;
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
button.borrar {
    background-color: black !important;
    border-color:  var(--primary-color);
    color: var(--primary-color) !important;
}
button.borrar:hover {
    background-color: rgba(83, 56, 31, 0.616) !important;
}

</style>