import { useConsulta } from '../../context/ConsultaContext';
import ConsultaLoc from '../TipoConsulta/ConsultaLoc'
import ConsultaProp from '../TipoConsulta/ConsulatProp'


const ConsultaForm = () => {
  const { tipoConsulta, setTipoConsulta } = useConsulta();

  return (
    <div className="consulta-form">
      <h2>Tipo de Consulta</h2>

      <select 
        value={tipoConsulta}
        onChange={(e) => setTipoConsulta(e.target.value)}
      >
        <option value="">--Selecciona una opción--</option>
        <option value="localidades">Localidades</option>
        <option value="propiedad">Propiedad Social</option>
      </select>

      {/* Despliegue condicional */}
      {tipoConsulta === "localidades" && <ConsultaLoc />}
      {tipoConsulta === "propiedad" && <ConsultaProp />}
    </div>
  );
};

export default ConsultaForm;