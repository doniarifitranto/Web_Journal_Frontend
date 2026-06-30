// Centralized API base URL — ubah di sini jika port backend berubah
export const API_BASE_URL = "http://localhost:8080/api";

export const ENDPOINTS = {
  // Auth
  me: `${API_BASE_URL}/auth/me`,
  refresh: `${API_BASE_URL}/auth/refresh`,
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  logout: `${API_BASE_URL}/auth/logout`,

  // Journal CRUD
  journal: `${API_BASE_URL}/journal`,
  journalById: (id) => `${API_BASE_URL}/journal/${id}`,

  // Dashboard
  dashboardStats: `${API_BASE_URL}/journal/dashboard/stats`,
  dashboardTrend: `${API_BASE_URL}/journal/dashboard/trend`,
  dashboardCalendar: `${API_BASE_URL}/journal/dashboard/calendar`,
  dashboardRecommendations: `${API_BASE_URL}/journal/dashboard/recommendations`,

  // Analytics
  analyticsData: `${API_BASE_URL}/journal/analytics/data`,
};
