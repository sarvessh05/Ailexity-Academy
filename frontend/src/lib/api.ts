import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const apiEndpoints = {
  // User endpoints
  getUserData: (userId: string) => api.get(`/api/user/${userId}/data`),
  
  // Enrollment endpoints
  enrollUser: (data: { userId: string; courseId: string }) => 
    api.post('/api/enroll', data),
  
  // Activity endpoints
  logActivity: (data: any) => api.post('/api/activity', data),
  
  // Auth endpoints
  sendOTP: (email: string) => api.post('/send-otp', { email }),
  verifyReset: (data: { email: string; otp: string; new_password: string }) => 
    api.post('/verify-reset', data),
};

export default api;
