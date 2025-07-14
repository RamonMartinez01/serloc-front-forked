import React, { useEffect, useState } from "react";
import { useConsulta } from "../context/ConsultaContext";
import { getLocalidadesPorMunicipioEstado } from "../api/estados";

const SelectorLocalidad = () => {
  const {
    estadoSeleccionado,
    municipioSeleccionado,
    localidadesSeleccionadas,
    setLocalidadesSeleccionadas,
  } = useConsulta();

  const [localidadesDisponibles, setLocalidadesDisponibles] = useState([]);

  useEffect(() => {
    const cargarLocalidades = async () => {
      if (estadoSeleccionado && municipioSeleccionado) {
        try {
          const response = await getLocalidadesPorMunicipioEstado(
            estadoSeleccionado,
            municipioSeleccionado
          );
          setLocalidadesDisponibles(response.data);
          setLocalidadesSeleccionadas([]); // reset de selección anterior
        } catch (error) {
          console.error("Error al obtener localidades:", error);
          setLocalidadesDisponibles([]);
        }
      } else {
        setLocalidadesDisponibles([]);
        setLocalidadesSeleccionadas([]);
      }
    };

    cargarLocalidades();
  }, [estadoSeleccionado, municipioSeleccionado, setLocalidadesSeleccionadas]);

  const manejarCambio = (e) => {
    const seleccionadas = Array.from(e.target.selectedOptions, (option) => option.value);
    setLocalidadesSeleccionadas(seleccionadas);
  };

  return (
    <div>
      <label>Localidades:</label>
      <select multiple value={localidadesSeleccionadas} onChange={manejarCambio}>
        {localidadesDisponibles.map((localidad) => (
          <option key={localidad.CVE_LOC} value={localidad.CVE_LOC}>
            {localidad.NOM_LOC}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectorLocalidad;