import React, { useEffect, useState } from "react";
import { getAllEstados } from "../api/estados";
import { useConsulta } from "../context/ConsultaContext";

const SelectorEstado = () => {
  const [estados, setEstados] = useState([]);
  const { estadoSeleccionado, setEstadoSeleccionado } = useConsulta();

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await getAllEstados();
        setEstados(response.data);
      } catch (error) {
        console.error("Error al obtener estados:", error);
      }
    };

    fetchEstados();
  }, []);

  return (
    <div>
      <label htmlFor="estado-select">Selecciona Estado:</label>
      <select
        id="estado-select"
        value={estadoSeleccionado}
        onChange={(e) => setEstadoSeleccionado(e.target.value)}
      >
        <option value="">-- Selecciona un Estado --</option>
        {estados.map((estado) => (
          <option key={estado.CVE_ENT} value={estado.CVE_ENT}>
            {estado.NOMGEO}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectorEstado;