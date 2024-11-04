import { defineStore } from 'pinia';

export const useProyectosStore = defineStore('proyectos', {
  state: () => ({
    proyectoActual: {
      descripcion: '',
      ancho: 0,
      alto: 0,
      grosor: 0,
      cantColores: 0,
      cantidad: 0,
      tipo: '',
      costoUnitario: 0,
      costoTotal: 0,
    },
    proyectos: [],
  }),
  actions: {
    calcularCostoUnitario() {
      const { ancho, alto, grosor, cantColores } = this.proyectoActual;
      const costoBase = 100; // Cambia esto según tus reglas de negocio
      const costoPorColor = 20;
      this.proyectoActual.costoUnitario =
        costoBase + (ancho * alto * grosor * 0.1) + (cantColores * costoPorColor);
    },
    calcularCostoTotal() {
      this.proyectoActual.costoTotal =
        this.proyectoActual.costoUnitario * this.proyectoActual.cantidad;
    },
    agregarProyecto() {
      // Clona el proyecto actual antes de agregarlo a la lista de proyectos
      this.proyectos.push({ ...this.proyectoActual });
      
      // Reinicia proyectoActual después de agregar
      this.proyectoActual = {
        descripcion: '',
        ancho: 0,
        alto: 0,
        grosor: 0,
        cantColores: 0,
        cantidad: 0,
        tipo: '',
        costoUnitario: 0,
        costoTotal: 0,
      };
    },
  },
});