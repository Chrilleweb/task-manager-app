const API_BASE_URL = 'http://localhost:3001';

const apiEndpoints = {
  login: `${API_BASE_URL}/login`,
  register: `${API_BASE_URL}/register`,
  frontpage: `${API_BASE_URL}/auth/frontpage`,
  createTask: `${API_BASE_URL}/auth/create-task`,
  viewTasks: `${API_BASE_URL}/auth/view-tasks`,
};

export default apiEndpoints;
