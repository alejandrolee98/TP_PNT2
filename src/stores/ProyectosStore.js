import { defineStore } from 'pinia';

export const useProyectosStore = defineStore('proyectos', {
  state: () => ({
    proyectos: [],
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
  }),

  actions: {
    agregarProyecto() {
      this.proyectos.push({ ...this.proyectoActual });
      this.proyectoActual = this.crearProyectoBase();
    },

    calcularCostoUnitario() {
      const { tipo, ancho, alto, grosor, cantColores } = this.proyectoActual;
      const costoBase = this.obtenerCostoBase(tipo);
      const tamaño = ancho * alto * grosor;
      const costoPorColor = 20.0;
      this.proyectoActual.costoUnitario = costoBase + (tamaño * 0.1) + (cantColores * costoPorColor);
    },

    calcularCostoTotal() {
      this.proyectoActual.costoTotal = this.proyectoActual.costoUnitario * this.proyectoActual.cantidad;
    },

    crearProyectoBase() {
      return {
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

    obtenerCostoBase(tipo) {
      switch (tipo) {
        case 'Imán': return 50;
        case 'Llavero': return 70;
        default: return 100;
      }
    },
  },
});