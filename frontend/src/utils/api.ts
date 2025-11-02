import axios from 'axios';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const api = axios.create({
  baseURL: isLocal
    ? 'http://localhost:8080/api'
    : 'https://bmsclone-production.up.railway.app/api', // Railway backend public domain (use exact)
  timeout: 10000,
});

export default api;
