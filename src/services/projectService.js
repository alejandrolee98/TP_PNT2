import axios from 'axios';

const API_BASE_URL = 'https://672aac89976a834dd0240f81.mockapi.io/api/users';

const crearProyecto = async (userId, projectData) => {
  const response = await axios.post(`${API_BASE_URL}/${userId}/proyecto`, projectData);
  return response.data;
};

const actualizarProyecto = async (userId, projectId, projectData) => {
  const response = await axios.put(`${API_BASE_URL}/${userId}/proyecto/${projectId}`, projectData);
  return response.data;
};

const obtenerProyecto = async (userId, proyectoId) => {
  if (!userId || !proyectoId) {
    throw new Error('userId o proyectoId no están definidos');
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}/proyecto/${proyectoId}`);
    return response.data;
  } catch (error) {
    console.error('Error al recuperar el proyecto:', error);
    throw error;
  }
};

const eliminarProyecto = async (userId, proyectoId) => {
  if (!userId || !proyectoId) {
    throw new Error('userId o proyectoId no están definidos');
  }
  try {
    await axios.delete(`${API_BASE_URL}/${userId}/proyecto/${proyectoId}`);
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    throw error;
  }
};

export default {
  crearProyecto,
  actualizarProyecto,
  obtenerProyecto,
  eliminarProyecto,
};