import React, { createContext, useContext, useState } from "react";


const ConsultaContext = createContext();

export const ConsultaProvider = ({ children }) => {
    const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
    const [localidadesSeleccionadas, setLocalidadesSeleccionadas] = useState([]);

    const [tipoConsulta, setTipoConsulta] = useState("");        // 'localidades' | 'propiedad'
    const [temaSeleccionado, setTemaSeleccionado] = useState(null); // objeto tema
    const [anioSeleccionado, setAnioSeleccionado] = useState("2010");
    const [indicadoresSeleccionados, setIndicadoresSeleccionados] = useState([]);
    const [variablesSeleccionadas, setVariablesSeleccionadas] = useState([]);

    return (
        <ConsultaContext.Provider
          value={{
            estadoSeleccionado,
            setEstadoSeleccionado,
            municipioSeleccionado,
            setMunicipioSeleccionado,
            localidadesSeleccionadas,
            setLocalidadesSeleccionadas,

            tipoConsulta, setTipoConsulta,
            temaSeleccionado, setTemaSeleccionado,
            anioSeleccionado, setAnioSeleccionado,
            indicadoresSeleccionados, setIndicadoresSeleccionados,
            variablesSeleccionadas, setVariablesSeleccionadas,
            
          }}
        >
            {children}
        </ConsultaContext.Provider>
    );
};

//Hook personalizado para consumir el context
export const useConsulta = () => useContext(ConsultaContext);

