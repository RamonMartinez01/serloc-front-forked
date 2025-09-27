import React, { useEffect, useState } from "react";
import { getAllEstados } from "../api/estados";
import { useConsulta } from "../context/ConsultaContext";

const SelectorEstado = () => {
  const [estados, setEstados] = useState([]);
  const { estadoSeleccionado, setEstadoSeleccionado,
    setMunicipioSeleccionado,
    setLocalidadesSeleccionadas,
   } = useConsulta(); // Esto manda la info de "SETer" a ConsultaContext

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

/* Función para limpiar los valores de los SETer cuando cambia el valor de EstadoSeleccionado */
const manejarCambioEstado = (e) => {
  const value = e.target.value;
  setEstadoSeleccionado(value);
  //si cambia el valor de estado (arriba), Municipio y localidades (abajo) se quedarán sin valor (vacío)
  setMunicipioSeleccionado("");
  setLocalidadesSeleccionadas([]);
  //Los valores de Tema, indicadores y variables se resetean en ConsultaLoc.jsx
}

  return (
    <div>
      <label htmlFor="estado-select">Selecciona Estado:</label>
      <select
        id="estado-select"
        value={estadoSeleccionado}
        onChange={manejarCambioEstado}
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