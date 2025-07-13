import { useState, useEffect } from "react";
import { getMunicipiosPorClaveEntidad } from "../api/estados";

export const useMunicipios = (cve_ent) => {
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cve_ent) return;
    setLoading(true);
    getMunicipiosPorClaveEntidad(cve_ent)
      .then((res) => {
        setMunicipios(res.data);
      })
      .finally(() => setLoading(false));
  }, [cve_ent]);

  return { municipios, loading };
};