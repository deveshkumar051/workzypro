import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isSessionCheck = error.config?.url?.includes('/auth/me');
    const isAuthPage = ['/login', '/register'].includes(window.location.pathname);

    if (error.response?.status === 401 && !isSessionCheck && !isAuthPage) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
