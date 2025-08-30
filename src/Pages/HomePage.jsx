import React from "react";
import ConsultaForm from "../components/ConsultaForum/ConsultaForum.jsx";

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
                <div>
                    {/*Sección de ficha de resultados*/}
                </div>
            </div>
        </div>
    )
};

export default HomePage;