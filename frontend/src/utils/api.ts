import axios from 'axios';

const isLocal = window.location.hostname === 'localhost';

// Automatically choose between local dev server and deployed backend
const api = axios.create({
  baseURL: isLocal
    ? 'http://localhost:8080/api'
    : 'https://bmsclone-production.up.railway.app/api', // <-- your Railway backend URL
  timeout: 10000,
});

export default api;
