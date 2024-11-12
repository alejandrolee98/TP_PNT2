<template> 
    <div class="cotizador container">
      <h1>Cotizador</h1>
      <form @submit.prevent="calcularCostoTotal" >
        <div class="mb-3">
          <label for="descripcion" class="form-label">Descripcion</label>
          <input type="text" v-model="descripcion" class="form-control" id="descripcion" placeholder="Descripcion del producto">
        </div>
        <div class="mb-3">
          <label for="ancho" class="form-label">Ancho</label>
          <input type="number" v-model.number="ancho" class="form-control" id="ancho" placeholder="En centimetros">
        </div>
        <div class="mb-3">
          <label for="alto" class="form-label">Alto</label>
          <input type="number" v-model.number="alto" class="form-control" id="alto" placeholder="En centimetros">
        </div>
        <div class="mb-3">
          <label for="grosor" class="form-label">Grosor</label>
          <input type="number" v-model.number="grosor" class="form-control" id="grosor" placeholder="En centimetros">
        </div>
        
        <label for="tipo" class="form-label">Tipo</label> <!-- Despliega listado -->
        <select v-model="tipo" class="form-select form-select-lg mb-3">
          <option selected disabled>Elige un tipo</option>
          <option value="iman">Imán</option>
          <option value="figura">Figura</option>
          <option value="otro">Otro</option>
        </select>
  
        <label for="material" class="form-label">Material</label> <!-- Despliega listado -->
        <select v-model="material" class="form-select form-select-lg mb-3">
          <option selected disabled>Elige material</option>
          <option value="economico">Económico</option>
          <option value="premium">Premium</option>
          <option value="alimentos">Apto Alimentos</option>
        </select>
  
        <div class="mb-3">
          <label for="color" class="form-label">Cantidad de colores</label>
          <input type="number" v-model.number="cantidadColores" class="form-control" id="color" placeholder="0">
        </div>
  
        <div class="mb-3">
          <label for="cantidad" class="form-label">Cantidad</label>
          <input type="number" v-model.number="cantidad" class="form-control" id="cantidad" placeholder="0">
        </div>
  
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button v-if="authStore.isAuthenticated" class="btn btn-primary me-md-2" type="button" @click="guardarProyecto">Enviar</button>
          <button v-if="!authStore.isAuthenticated" class="btn btn-primary me-md-2" type="button" @click="registrarme">Registrarme</button>
          <button class="btn btn-danger" type="button" @click="cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
 import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores';

const router = useRouter();
const authStore = useAuthStore();

 // Seteo inicial de parametros
  
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
  
  const materiales = {
    economico: 1.0,
    premium: 1.2,
    alimentos: 1.5
  };
  
  const calcularCostoBase = () => {
    //devuelve coeficiente segun tipo
    switch (tipo.value) {
      case 'iman': return 50;
      case 'figura': return 100;
      case 'otro': return 75;
      default: return 0;
    }
  };
  
  const calcularCosto = () => {
    // calcula costo unitario del proyecto
    const costoBase = calcularCostoBase();
    const tamaño = ancho.value * alto.value * grosor.value;
    const costoPorColor = 20;
    costoUnitario.value = (costoBase + tamaño * 0.1 + cantidadColores.value * costoPorColor) * materiales[material.value];
    return costoUnitario.value;
  };
  
  const calcularCostoTotal = () => {
    // calcula costo total (costo base *  cantidad de unidades)
    calcularCosto(); 
  costoTotal.value = costoUnitario.value * cantidad.value;
  };
  
  const cancelar = () => {
    // vuelve los parametros al valor inicial
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

  // Agrega la función para guardar el proyecto en MockAPI
const guardarProyecto = async () => {
  if (!authStore.isAuthenticated) {
    console.warn('Usuario no autenticado');
    return;
  }

  calcularCostoTotal();

  try {
    const userId = authStore.user.id;
    const response = await axios.post(`https://6721850698bbb4d93ca89e32.mockapi.io/api/users/${userId}/proyecto`, {
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
    });
    console.log('Proyecto guardado:', response.data);
    const proyectoId = response.data.id; // Obtener el ID del proyecto recién creado
    cancelar(); // Limpia los campos después de guardar
    router.push({ name: 'Detalle', params: { proyectoId } }); // Redirige a la vista detalleProyecto con el proyectoId

  } catch (error) {
    console.error('Error al guardar el proyecto:', error);
  }
};

const registrarme = ()=>{
  router.push('/registrar/nuevo');
}
</script>
  
  <style scoped>
  .form-select, .form-control {
    background-color: rgba(55, 55, 55, 0.8); /* Fondo del select cerrado */
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
    margin-top: 4rem;
    margin-bottom: 5rem;
  }
  .cotizador h1 {
    margin-bottom: 2rem;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    font-size: var(--h1-size);
  }
  .cotizador label {
    color: white;
    font-size: 0.9rem;
  }

  button {
    background-color: var(--primary-color) !important;
    border-color:  var(--primary-color);
    font-weight: bold;
    margin-top: 1rem;
    font-size: 0.9rem;
  }
 button {
    background-color: var(--primary-color-hover) !important;
    border-color: var(--primary-color-hover);
    font-weight: bold;
  }
</style>