import axios from 'axios';
import { getAuth } from 'firebase/auth';

const sanitizeBaseUrl = (value: string) => value.replace(/\/+$/, '');

const getApiBaseUrl = () => {
  // Check for environment variable first (for local dev or custom config)
  const envValue = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (envValue) {
    return sanitizeBaseUrl(envValue.trim());
  }

  // Default to production backend URL if no env var is set
  const isDevelopment = import.meta.env.DEV;
  if (isDevelopment) {
    // In development, use localhost or proxy (vite.config.ts handles this)
    return '';
  }

  // Production: use the Render backend URL
  return 'https://gofastbackendv2-fall2025.onrender.com';
};

const API_BASE_URL = getApiBaseUrl() ? `${getApiBaseUrl()}/api` : '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
  // NO withCredentials - we use Bearer tokens, not cookies
});

// Request interceptor - AUTOMATICALLY adds Firebase token to all requests
// This matches MVP1 pattern - Firebase SDK automatically refreshes tokens
api.interceptors.request.use(
  async (config) => {
    // Get Firebase auth instance
    const firebaseAuth = getAuth();
    const user = firebaseAuth.currentUser;
    
    // If user is authenticated, add token to request
    if (user) {
      try {
        const token = await user.getIdToken(); // Firebase SDK gets fresh token automatically
        config.headers.Authorization = `Bearer ${token}`; // Automatically added!
      } catch (error) {
        console.error('❌ Failed to get Firebase token:', error);
      }
    }
    
    // Log request
    console.log('🔥 API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handles errors and token refresh
api.interceptors.response.use(
  response => {
    console.log('✅ API Response:', response.status, response.data);
    return response;
  },
  async error => {
    console.error('❌ API Error:', error.response?.status, error.response?.data || error.message);
    
    // Handle 401 (Unauthorized) - try to refresh token if expired
    if (error.response?.status === 401) {
      const errorData = error.response?.data;
      const firebaseAuth = getAuth();
      const user = firebaseAuth.currentUser;
      
      // If token expired, try to refresh it
      if (errorData?.code === 'TOKEN_EXPIRED' || errorData?.shouldRefresh) {
        console.log('🔄 Token expired, attempting refresh...');
        
        if (user) {
          try {
            // Force token refresh
            const newToken = await user.getIdToken(true); // Force refresh
            console.log('✅ Token refreshed, retrying request...');
            
            // Retry the original request with new token
            const config = error.config;
            config.headers.Authorization = `Bearer ${newToken}`;
            return api.request(config);
          } catch (refreshError) {
            console.error('❌ Token refresh failed:', refreshError);
            // Fall through - let component handle the error
          }
        }
      }
      
      // DON'T automatically redirect - let components handle it
      console.warn('🚫 401 Unauthorized - Component should handle navigation');
    }
    
    return Promise.reject(error);
  }
);

export default api;

// Legacy exports for backward compatibility
export const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    // No base URL means use relative path (dev mode with Vite proxy)
    return normalizedPath;
  }

  return `${baseUrl}${normalizedPath}`;
};
