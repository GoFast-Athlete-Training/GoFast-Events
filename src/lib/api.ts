const sanitizeBaseUrl = (value: string) => value.replace(/\/+$/, '');

export const getApiBaseUrl = () => {
  // Check for environment variable first (for local dev or custom config)
  const envValue = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (envValue) {
    return sanitizeBaseUrl(envValue.trim());
  }

  // Default to production backend URL if no env var is set
  // This ensures the app works in production without requiring env var configuration
  const isDevelopment = import.meta.env.DEV;
  if (isDevelopment) {
    // In development, use localhost or proxy (vite.config.ts handles this)
    return '';
  }

  // Production: use the Render backend URL
  return 'https://gofastbackendv2-fall2025.onrender.com';
};

export const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    // No base URL means use relative path (dev mode with Vite proxy)
    return normalizedPath;
  }

  return `${baseUrl}${normalizedPath}`;
};

