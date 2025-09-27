import { useEffect, useMemo, useState } from "react";
import { useConsulta } from "../../context/ConsultaContext";
import { getIndicadores } from "../../api/indicadores";

/**
 * Panel hermano de ConsultaForm: muestra un resumen
 * de la selección actual. Luego podemos cambiarlo para
 * consultar valores y métricas reales.
 */
const ResultadosPanel = () => {
  const {
    localidadesSeleccionadas,
    indicadoresSeleccionados,
    variablesSeleccionadas,
    anioSeleccionado,
    temaSeleccionado,
  } = useConsulta();

  // Carga catálogo de indicadores para mapear IDs -> texto
  const [catIndicadores, setCatIndicadores] = useState([]);
  useEffect(() => {
    getIndicadores().then((res) => setCatIndicadores(res.data)).catch(() => {});
  }, []);

  const etiquetasSeleccionadas = useMemo(() => {
    const porId = new Map(catIndicadores.map((i) => [i.id, i.indicadores]));
    const ind = indicadoresSeleccionados.map((id) => porId.get(id)).filter(Boolean);
    const vars = variablesSeleccionadas.map((id) => porId.get(id)).filter(Boolean);
    return { ind, vars };
  }, [catIndicadores, indicadoresSeleccionados, variablesSeleccionadas]);

  return (
    <>
      <h3 className="resultados-panel h3">Resultados</h3>

      <div>
        <div><strong>Tema:</strong> {temaSeleccionado?.tema || "—"}</div>
        <div><strong>Año:</strong> {anioSeleccionado}</div>
        <div><strong>Localidades seleccionadas:</strong> {localidadesSeleccionadas?.length || 0}</div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Localidad</th>
            <th>Índice/Variable</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {(localidadesSeleccionadas || []).map((locId) => {
            const etiquetas = [
              ...etiquetasSeleccionadas.ind,
              ...etiquetasSeleccionadas.vars,
            ];
            if (etiquetas.length === 0) {
              return (
                <tr key={`loc-${locId}`}>
                  <td>{locId}</td>
                  <td>—</td>
                  <td>—</td>
                </tr>
              );
            }
            return etiquetas.map((et, idx) => (
              <tr key={`loc-${locId}-${idx}`}>
                <td>{locId}</td>
                <td>{et}</td>
                <td>—{/* Placeholder: conectaremos con valores reales en la siguiente fase */}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>

      <div className="resultados-actions">
        <button>⬇️ Descargar datos</button>
        <button>⬇️ Descargar descriptor</button>
        <button>⬇️ Descargar mapa del municipio</button>
      </div>
    </>
  );
};

export default ResultadosPanel;