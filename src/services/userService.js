import axios from 'axios';

const API_BASE_URL = 'https://67329d4e2a1b1a4ae1106784.mockapi.io/api';

const userService = {
  async obtenerUsuarioPorId(id) {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },

  async crearUsuario(user) {
    const response = await axios.post(`${API_BASE_URL}/users`, user);
    return response.data;
  },

  async actualizarUsuario(id, user) {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, user);
    return response.data;
  },

  async login(email, password) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      const user = response.data.find((u) => u.email === email && u.pass === password);

      if (user) {
        return user; // Devuelve el usuario autenticado
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error en userService.login:', error);
      throw error;
    }
  },

  async getUserProjects(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/proyecto`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener proyectos del usuario:', error);
      throw error;
    }
  },

  //método para obtener todos los usuarios con sus proyectos
  async fetchUsuariosConProyectos() {
    try {
      // 1. Obtener todos los usuarios
      const response = await axios.get(`${API_BASE_URL}/users`);
      const usuarios = response.data;
  
      // 2. Mapear y obtener proyectos de cada usuario
      const proyectosCadaUsuario = usuarios.map(async (user) => {
        try {
          const projectResponse = await axios.get(`${API_BASE_URL}/users/${user.id}/proyecto`);
          return {
            ...user,
            proyecto: projectResponse.data || [],
          };
        } catch (error) {
          console.warn(`Error al obtener proyectos del usuario ${user.id}:`, error);
          return { 
            ...user,
            proyecto: [],
          }; // Devuelve una lista vacía si falla
        }
      });
  
      // 3. Resolver todas las promesas antes de devolver los datos
      const usuariosConProyectos = await Promise.all(proyectosCadaUsuario);
      return usuariosConProyectos;
    } catch (error) {
      console.error('Error al obtener usuarios con proyectos:', error);
      throw error;
    }
  }
  
};

export default userService;