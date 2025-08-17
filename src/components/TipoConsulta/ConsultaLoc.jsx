import { useEffect, useState } from "react";
import { useConsulta } from "../../context/ConsultaContext";
import SelectorEstado from "../SelectorEstado";
import SelectorMunicipio from "../SelectorMunicipio";
import SelectorLocalidad from "../SelectorLocalidad";
import { api } from "../../api";           // instancia axios
import { getIndicadores } from "../../api/indicadores"; // lo añadiremos enseguida

const ConsultaLoc = () => {
  const {
    temaSeleccionado, setTemaSeleccionado,
    anioSeleccionado, setAnioSeleccionado,
    indicadoresSeleccionados, setIndicadoresSeleccionados,
    variablesSeleccionadas, setVariablesSeleccionadas,
  } = useConsulta();

  const [temas, setTemas] = useState([]);
  const [indicadoresFiltrados, setIndicadoresFiltrados] = useState([]);
  const [variablesFiltradas, setVariablesFiltradas] = useState([]);

  /* ───────── 1. carga de temas ───────── */
  useEffect(() => {
    api.get("/temas").then(res => setTemas(res.data));
  }, []);

  /* ───────── 2. filtrar indicadores/variables ───────── */
  useEffect(() => {
    if (!temaSeleccionado) {
      setIndicadoresFiltrados([]);
      setVariablesFiltradas([]);
      return;
    }

    getIndicadores().then(res => {
      const data = res.data.filter(item =>
        item.cve_tem === temaSeleccionado.cve_tem &&
        item.indicadores.endsWith(anioSeleccionado)
      );

      setIndicadoresFiltrados(
        data.filter(d =>
          d.indicadores.toLowerCase().startsWith("índice") ||
          d.indicadores.toLowerCase().startsWith("nivel")
        )
      );

      setVariablesFiltradas(
        data.filter(d =>
          !d.indicadores.toLowerCase().startsWith("índice") &&
          !d.indicadores.toLowerCase().startsWith("nivel")
        )
      );
    });
  }, [temaSeleccionado, anioSeleccionado]);

  /* ───────── handler de checkbox ───────── */
  const toggleSeleccion = (id, lista, setter) => {
    setter(lista.includes(id)
      ? lista.filter(x => x !== id)
      : [...lista, id]);
  };

  return (
    <div className="consulta-loc">
      {/* Cascada geo */}
      <SelectorEstado />
      <SelectorMunicipio />
      <SelectorLocalidad />

      {/* Tema */}
      <label>Tema:</label>
      <select
        value={temaSeleccionado?.id || ""}
        onChange={(e) =>
          setTemaSeleccionado(temas.find(t => t.id === Number(e.target.value)))
        }
      >
        <option value="">-- Selecciona un tema --</option>
        {temas.map(t => (
          <option key={t.id} value={t.id}>{t.tema}</option>
        ))}
      </select>

      {/* Año */}
      <label>Año:</label>
      <select
        value={anioSeleccionado}
        onChange={(e) => setAnioSeleccionado(e.target.value)}
      >
        <option value="2010">2010</option>
        <option value="2020">2020</option>
      </select>

      {/* Indicadores */}
      <h4>Indicadores</h4>
      {indicadoresFiltrados.map(ind => (
        <div key={ind.id}>
          <label>
            <input
              type="checkbox"
              checked={indicadoresSeleccionados.includes(ind.id)}
              onChange={() =>
                toggleSeleccion(ind.id, indicadoresSeleccionados, setIndicadoresSeleccionados)
              }
            />
            {ind.indicadores}
          </label>
        </div>
      ))}

      {/* Variables */}
      <h4>Variables</h4>
      {variablesFiltradas.map(variable => (
        <div key={variable.id}>
          <label>
            <input
              type="checkbox"
              checked={variablesSeleccionadas.includes(variable.id)}
              onChange={() =>
                toggleSeleccion(variable.id, variablesSeleccionadas, setVariablesSeleccionadas)
              }
            />
            {variable.indicadores}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ConsultaLoc;