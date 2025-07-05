import { api } from "./index";

export const getEstados = () => api.get("/estados");
export const getMunicipios = (estado) => api.get(`/estados/${estado}`);