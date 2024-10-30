<template>
    <div class="container">
      <h2>Detalle del Proyecto</h2>
      <dl class="row details-info">
        <dt class="col-sm-3">Descripción</dt>
        <dd class="col-sm-9">Proyecto 1</dd>
        
        <dt class="col-sm-3">Ancho</dt>
        <dd class="col-sm-9">5 cm</dd>
        
        <dt class="col-sm-3">Alto</dt>
        <dd class="col-sm-9">5 cm</dd>
        
        <dt class="col-sm-3">Grosor</dt>
        <dd class="col-sm-9">5 cm</dd>
        
        <dt class="col-sm-3">Cantidad de Colores</dt>
        <dd class="col-sm-9">3</dd>
        
        <dt class="col-sm-3">Cantidad de Unidades</dt>
        <dd class="col-sm-9">1</dd>
        
        <dt class="col-sm-3">Tipo</dt>
        <dd class="col-sm-9">Iman</dd>
        
        <dt class="col-sm-3">Costo Unitario</dt>
        <dd class="col-sm-9"><strong>$234</strong></dd>
        
        <dt class="col-sm-3">Costo Total</dt>
        <dd class="col-sm-9"><strong>$234</strong></dd>
      </dl>
      <div class="text-center">
        <router-link class="nav-link" to="/cotizador"><button class="btn btn-secondary">Volver al Cotizador</button></router-link>
      </div>
    </div>
  </template>
  
  <script setup>

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