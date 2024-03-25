const API_BASE_URL = process.env.BACKEND_URL;

const apiEndpoints = {
  login: `${API_BASE_URL}/login`,
  register: `${API_BASE_URL}/register`,
  frontpage: `${API_BASE_URL}/auth/frontpage`,
  createTask: `${API_BASE_URL}/auth/create-task`,
  viewTasks: `${API_BASE_URL}/auth/view-tasks`,
  taskDetails: (id: string) => `${API_BASE_URL}/auth/view-task/${id}`,
  editDetails: (id: string) => `${API_BASE_URL}/auth/edit-task/${id}`,
  deleteTask: (id: string) => `${API_BASE_URL}/auth/delete-task/${id}`,
  completeTask: (id: string) => `${API_BASE_URL}/auth/complete-task/${id}`,
  completeSubtask: (id: string, subtaskId: string) => `${API_BASE_URL}/auth/complete-subtask/${id}/${subtaskId}`,
  searchUsers: `${API_BASE_URL}/auth/search-users`,
};

export default apiEndpoints;
