import React, { createContext, useContext, useState } from "react";


const ConsultaContext = createContext();

export const ConsultaProvider = ({ children }) => {
    const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
    const [localidadesSeleccionadas, setLocalidadesSeleccionadas] = useState([]);

    return (
        <ConsultaContext.Provider
          value={{
            estadoSeleccionado,
            setEstadoSeleccionado,
            municipioSeleccionado,
            setMunicipioSeleccionado,
            localidadesSeleccionadas,
            setLocalidadesSeleccionadas,
          }}
        >
            {children}
        </ConsultaContext.Provider>
    );
};

//Hook personalizado para consumir el context
export const useConsulta = () => useContext(ConsultaContext);

