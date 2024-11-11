import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/students', // Update this to match your backend URL
});

export default api;
