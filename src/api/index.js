import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Instancia de axios con configuración base
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

