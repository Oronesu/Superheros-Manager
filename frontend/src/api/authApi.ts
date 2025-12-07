import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Inscription
export const register = async (email: string, password: string, role: string = "user") => {
  const res = await axios.post(`${API_URL}/register`, { email, password, role });
  return res.data; // { token }
};

// Connexion
export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data; // { token }
};

// Déconnexion (coté front, on supprime juste le token)
export const logout = () => {
  localStorage.removeItem("token");
};

// Sauvegarde du token
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Récupération du token
export const getToken = () => {
  return localStorage.getItem("token");
};
