import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bookmyshow-backend-production.up.railway.app/api', // <-- Replace with your real Railway URL
  timeout: 10000,
});

export default api;
