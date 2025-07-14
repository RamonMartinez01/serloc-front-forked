import { useState, useEffect } from "react";
import { getLocalidadesPorMunicipioEstado } from "../api/estados";

export const useLocalidades = (cve_ent, cve_mun) => {
  const [localidades, setLocalidades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cve_ent || !cve_mun) return;
    setLoading(true);
    getLocalidadesPorMunicipioEstado(cve_ent, cve_mun)
      .then((res) => {
        setLocalidades(res.data);
      })
      .finally(() => setLoading(false));
  }, [cve_ent, cve_mun]);

  return { localidades, loading };
};