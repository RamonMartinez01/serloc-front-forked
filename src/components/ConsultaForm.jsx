import SelectorEstado from './SelectorEstado';
import SelectorMunicipio from './SelectorMunicipio';
import SelectorLocalidad from './SelectorLocalidad';

const ConsultaForm = () => {
  return (
    <div className="consulta-form">
      <h2>Consulta por Localidad</h2>
      <SelectorEstado />
      <SelectorMunicipio />
      <SelectorLocalidad />
    </div>
  );
};

export default ConsultaForm;