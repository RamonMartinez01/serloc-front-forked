import React from "react"
import SelectorEstado from "../SelectorEstado";
import SelectorMunicipio from "../SelectorMunicipio";

const ConsultaProp = () => {

    return (
        <div className="consulta-prop">
            <p>Consulta de Propiedad Social (en construcción)</p>
            <SelectorEstado />
            <SelectorMunicipio />
            {/* Próximamente: Selector Ejido / Comunidad */}
            <select disabled>
                <option>Ejido o Comunidad (pendiente)</option>
            </select>

            <label>Año:</label>
            <select disabled>
                <option>2010</option>
                <option>2020</option>
            </select>
        </div>
    );
};

export default ConsultaProp;