import React from "react";
import ConsultaForm from "../components/ConsultaForum/ConsultaForum.jsx";
import ResultadosPanel from "../components/Resultados/ResultadosPanel.jsx";

const HomePage = () => {


    return (
        <div className="home">

            <h1 className="home__title">
                Servicio de Información y Conocimiento de Localidades Rurales y sus Territorios
            </h1>

            <div className="home__grid">
                <div className="card">
                    <ConsultaForm />
                </div>
                {<div className="card resultados-panel">
                    < ResultadosPanel/>
                </div>}
            </div>
        </div>
    )
};

export default HomePage;