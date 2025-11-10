import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

console.log("API Base URL:", BASE); // Debug log to verify URL

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Request interceptor - attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Debug logging for instructor/auth endpoints
  if (config.url?.includes("/instructor/") || config.url?.includes("/auth/")) {
    console.debug("API →", config.method?.toUpperCase(), config.baseURL + config.url);
  }
  
  return config;
});

// Response interceptor - handle errors and auth
api.interceptors.response.use(
  (response) => {
    // Debug logging
    if (response.config?.url?.includes("/instructor/") || response.config?.url?.includes("/auth/")) {
      console.debug("API ←", response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    // Debug logging
    const cfg = error.config || {};
    if (cfg.url?.includes("/instructor/") || cfg.url?.includes("/auth/")) {
      console.debug("API ×", cfg.method?.toUpperCase(), cfg.url, {
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    
    // Handle 401 - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
}

// Auth API
export const authApi = {
  login: (credentials) => api.post("/auth/token/", credentials),
  register: (userData) => api.post("/auth/register/", userData),
  me: () => api.get("/auth/me/"),
  refreshToken: (refresh) => api.post("/auth/token/refresh/", { refresh }),
};

// Modules API
export const moduleApi = {
  list: (params) => api.get("/modules/", { params }),
  get: (id) => api.get(`/modules/${id}/`),
};

// Lessons API
export const lessonApi = {
  list: (params) => api.get("/lessons/", { params }),
  get: (id) => api.get(`/lessons/${id}/`),
  create: (data) => api.post("/lessons/", data),
  update: (id, data) => api.put(`/lessons/${id}/`, data),
  remove: (id) => api.delete(`/lessons/${id}/`),
};

// Progress API
export const progressApi = {
  dashboard: () => api.get("/progress/dashboard/"),
  complete: (lessonId) => api.post(`/lesson-progress/${lessonId}/complete/`),
  certificates: () => api.get("/certificates/"),
  certificate: (id) => api.get(`/certificates/${id}/`),
};

// Community API
export const communityApi = {
  threads: (params) => api.get("/community/threads/", { params }),
  thread: (id) => api.get(`/community/threads/${id}/`),
  createThread: (data) => api.post("/community/threads/", data),
  updateThread: (id, data) => api.put(`/community/threads/${id}/`, data),
  deleteThread: (id) => api.delete(`/community/threads/${id}/`),
  
  comments: (threadId) => api.get(`/community/threads/${threadId}/comments/`),
  createComment: (threadId, data) => api.post(`/community/threads/${threadId}/comments/`, data),
  updateComment: (threadId, commentId, data) => api.put(`/community/threads/${threadId}/comments/${commentId}/`, data),
  deleteComment: (threadId, commentId) => api.delete(`/community/threads/${threadId}/comments/${commentId}/`),
  
  vote: (threadId, voteType) => api.post(`/community/threads/${threadId}/vote/`, { vote_type: voteType }),
};

// Instructor API
export const instructorApi = {
  modules: () => api.get("/instructor/modules/"),
  getModule: (id) => api.get(`/instructor/modules/${id}/`),
  createModule: (payload) => api.post("/instructor/modules/", payload),
  updateModule: (id, payload) => api.put(`/instructor/modules/${id}/`, payload),
  deleteModule: (id) => api.delete(`/instructor/modules/${id}/`),
  apply: (payload) => {
    if (!payload) {
      return api.get("/instructor/apply/");
    }
    return api.post("/instructor/apply/", payload);
  },
};

// Badges API
export const badgeApi = {
  list: () => api.get("/badges/"),
};

export default api;