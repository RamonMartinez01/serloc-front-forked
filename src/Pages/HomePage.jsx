import React from "react";
import ConsultaForm from "../components/ConsultaForum/ConsultaForum.jsx";

const HomePage = () => {


    return (
        <div className="consulta__main-cointainer">
            <section className="">
                <h1>
                    Servicio de Información y Conocimiento de Localidades Rurales y sus Territorios
                </h1>
            </section>
            <section>
                <div>
                    <ConsultaForm />
                </div>
                <div>
                    {/*Sección de ficha de resultados*/}
                </div>
            </section>
        </div>
    )
};

export default HomePage;