import { useState, useEffect } from "react";
import { useConsulta } from "../context/ConsultaContext";
import { getMunicipiosPorClaveEntidad } from "../api/estados";

const SelectorMunicipio = () => {
  const {
    estadoSeleccionado,
    municipioSeleccionado,
    setMunicipioSeleccionado,
    setLocalidadesSeleccionadas,
  } = useConsulta();

  const [municipios, setMunicipios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Efecto que escucha el cambio de estadoSeleccionado
  useEffect(() => {
    if (!estadoSeleccionado) {
      setMunicipios([]);
      setMunicipioSeleccionado("");
      return;
    }

    const fetchMunicipios = async () => {
      setCargando(true);
      setError(null);

      try {
        const response = await getMunicipiosPorClaveEntidad(estadoSeleccionado);
        setMunicipios(response.data);
      } catch (err) {
        console.error("Error al obtener municipios:", err);
        setError("No se pudieron cargar los municipios");
      } finally {
        setCargando(false);
      }
    };

    fetchMunicipios();
  }, [estadoSeleccionado, setMunicipioSeleccionado]);

  // Manejo del cambio de municipio
  const manejarCambio = (e) => {
    const valor = e.target.value;
    setMunicipioSeleccionado(valor);
    setLocalidadesSeleccionadas([]); // Resetear localidades al cambiar municipio
  };

  return (
    <div>
      <label htmlFor="selector-municipio">Municipio:</label>
      <select
        id="selector-municipio"
        value={municipioSeleccionado}
        onChange={manejarCambio}
        disabled={!estadoSeleccionado || cargando}
      >
        <option value="">Selecciona Municipio</option>
        {municipios.map((muni) => (
          <option key={muni.CVE_MUN} value={muni.CVE_MUN}>
            {muni.NOMGEO}
          </option>
        ))}
      </select>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SelectorMunicipio;