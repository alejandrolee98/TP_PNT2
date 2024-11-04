<template> 
    <div class="container">
      <h1>Cotizador</h1>
      <form @submit.prevent="calcularCostoTotal">
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
        
        <label for="tipo" class="form-label">Tipo</label>
        <select v-model="tipo" class="form-select form-select-lg mb-3">
          <option selected disabled>Elige un tipo</option>
          <option value="iman">Imán</option>
          <option value="figura">Figura</option>
          <option value="otro">Otro</option>
        </select>
  
        <label for="material" class="form-label">Material</label>
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
          <button class="btn btn-primary me-md-2" type="submit">Enviar</button>
          <button class="btn btn-danger" type="button" @click="cancelar">Cancelar</button>
        </div>
      </form>
      <p v-if="costoTotal">Costo total: {{ costoTotal.toFixed(2) }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const descripcion = ref('');
  const ancho = ref(0);
  const alto = ref(0);
  const grosor = ref(0);
  const tipo = ref('');
  const material = ref('');
  const cantidadColores = ref(0);
  const cantidad = ref(1);
  const costoTotal = ref(0);
  
  const materiales = {
    economico: 1.0,
    premium: 1.2,
    alimentos: 1.5
  };
  
  const calcularCostoBase = () => {
    switch (tipo.value) {
      case 'iman': return 50;
      case 'figura': return 100;
      case 'otro': return 75;
      default: return 0;
    }
  };
  
  const calcularCosto = () => {
    const costoBase = calcularCostoBase();
    const tamaño = ancho.value * alto.value * grosor.value;
    const costoPorColor = 20;
    const costoUnitario = (costoBase + tamaño * 0.1 + cantidadColores.value * costoPorColor) * materiales[material.value];
    return costoUnitario;
  };
  
  const calcularCostoTotal = () => {
    costoTotal.value = calcularCosto() * cantidad.value;
  };
  
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
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  </style>