import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bmsclone-production.up.railway.app/api',
  timeout: 10000,
});

export default api;
