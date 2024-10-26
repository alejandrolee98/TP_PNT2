<template>
    <div class="container">
        <h1>Cotizador</h1>
        <form>
            <div class="mb-3">
                <label for="descripcion" class="form-label">Descripcion</label>
                <input type="text" class="form-control" id="descripcion" placeholder="Descripcion del producto">
            </div>
            <div class="mb-3">
                <label for="ancho" class="form-label">Ancho</label>
                <input type="text" class="form-control" id="ancho" placeholder="En centimetros">
            </div>
            <div class="mb-3">
                <label for="alto" class="form-label">Alto</label>
                <input type="text" class="form-control" id="alto" placeholder="En centimetros">
            </div>
            <div class="mb-3">
                <label for="grosor" class="form-label">Grosor</label>
                <input type="text" class="form-control" id="grosor" placeholder="En centimetros">
            </div>
            
            <label for="tipo" class="form-label">Tipo</label>
            <select class="form-select form-select-lg mb-3" aria-label="Large select example">
                <option selected>Elige un tipo</option>
                <option value="1">One</option> <!--hacer un for con las opciones-->
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            
            <label for="material" class="form-label">Material</label>
            <select class="form-select form-select-lg mb-3" aria-label="Large select example">
                <option selected>Elige material</option>
                <option value="1">One</option> <!--hacer un for con las opciones-->
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>

            <div class="mb-3">
                <label for="color" class="form-label">Cantidad de colores</label>
                <input type="text" class="form-control" id="color" placeholder="0">
            </div>

            <div class="mb-3">
                <label for="cantidad" class="form-label">Cantidad</label>
                <input type="text" class="form-control" id="cantidad" placeholder="0">
            </div>

            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <button class="btn btn-primary me-md-2" type="submit">Enviar</button>
                <button class="btn btn-danger" type="button">Cancelar</button>
            </div>
        </form>
    </div>
</template>
