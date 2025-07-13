import { api } from "./index";

// Encuentra todos los estados SIN municipios (SIN GEOM)
export const getAllEstados = () => api.get("/estados");

// Encuentra solo los municipios que tengan relación con el estado por CVE_ENT
export const getMunicipiosPorClaveEntidad = (cve_ent) =>
    api.get(`/estados/${cve_ent}/municipios`);
  
// Encuentra UN municipio específico por CVE_ENT y CVE_MUN
export const getMunicipioPorClaveMunicipio = (cve_ent, cve_mun) =>
  api.get(`/estados/${cve_ent}/municipios/${cve_mun}`);

// Encuentra todas las localidades de un municipio de un estado por CVE_ENT y CVE_MUN
export const getLocalidadesPorMunicipioEstado = (cve_ent, cve_mun) =>
  api.get(`/estados/${cve_ent}/municipios/${cve_mun}/localidades`);
  
 