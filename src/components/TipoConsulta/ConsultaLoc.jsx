import { useEffect, useState } from "react";
import { useConsulta } from "../../context/ConsultaContext";
import SelectorEstado from "../SelectorEstado";
import SelectorMunicipio from "../SelectorMunicipio";
import SelectorLocalidad from "../SelectorLocalidad";
import { api } from "../../api";           // instancia axios
import { getIndicadores } from "../../api/indicadores";



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

  // Helpers
  const normalize = (s) =>
    s.normalize?.('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() ?? s.toLowerCase();

  const esIndicador = (texto) => {
    const t = normalize(texto.trim());
    return t.startsWith('indice') || t.startsWith('nivel'); // cubre "Índice"/"Indice" y "Nivel"
  };

  // Incluye si el texto menciona el año elegido (ya sea "2010" o "2020", o en rangos "2010-2020")
  const incluyeAnio = (texto, anio) => texto.includes(anio);

  // Reemplaza cualquier "2010-2020" | "2010" | "2020" por el año elegido, preservando demás sufijos
  const formatearEtiquetaConAnio = (texto, anio) => {
    // Nota: solo llamamos esta función si `incluyeAnio(texto, anio)` ya fue true
    return texto.replace(/\b2010-2020\b|\b2010\b|\b2020\b/g, anio);
  };

  /* ───────── 2. filtrar indicadores/variables ───────── */
  useEffect(() => {
    if (!temaSeleccionado) {
      setIndicadoresFiltrados([]);
      setVariablesFiltradas([]);
      return;
    }

    getIndicadores().then(res => {
      // 1) filtra por tema y por presencia del año elegido (incluye rangos)
      const dataFiltrada = res.data.filter(
        (item) => item.cve_tem === temaSeleccionado.cve_tem && incluyeAnio(item.indicadores, anioSeleccionado)
      );

      // 2) normaliza las etiquetas para que muestren SOLO el año elegido
      const dataEtiquetada = dataFiltrada.map((item) => ({
        ...item,
        indicadores: formatearEtiquetaConAnio(item.indicadores, anioSeleccionado),
      }));

      // 3) separa Indicadores vs Variables por prefijo ("Índice"/"Nivel")
      const soloIndicadores = dataEtiquetada.filter((d) => esIndicador(d.indicadores));
      const soloVariables = dataEtiquetada.filter((d) => !esIndicador(d.indicadores));

      setIndicadoresFiltrados(soloIndicadores);
      setVariablesFiltradas(soloVariables);
    });
  }, [temaSeleccionado, anioSeleccionado]);

  /* ───────── handler de checkbox ───────── */
  const toggleSeleccion = (id, lista, setter) => {
    setter(lista.includes(id)
      ? lista.filter(x => x !== id)
      : [...lista, id]);
  };

  /* limpia los valores de indicadoresSeleccionados, variablesSeleccionadas al cambiar el año seleccionado */
  useEffect(() => {
    if (indicadoresSeleccionados.length || variablesSeleccionadas.length) {
      setVariablesSeleccionadas([])
      setIndicadoresSeleccionados([])
    }
  }, [anioSeleccionado, temaSeleccionado, SelectorMunicipio])

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