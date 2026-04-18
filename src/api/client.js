import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://cascade-api-production.up.railway.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auto-attach JWT token from localStorage to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions
export const register = async (data) => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

export const login = async (data) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};

export const computeScore = async () => {
  // Assuming the endpoint for computing a score is POST /scores/compute
  const response = await apiClient.post('/scores/compute');
  return response.data;
};

export const logVitals = async (data) => {
  const response = await apiClient.post('/vitals', data);
  return response.data;
};

export default apiClient;
