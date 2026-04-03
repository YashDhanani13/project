  import axios from 'axios';

  const api = axios.create({
    baseURL: 'http://localhost:3000/api',
  });


  api.interceptors.request.use(
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

  // RESPONSE: When the server sends an answer back
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // If the server says 401 (Unauthorized), it means the token expired
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  export default api;