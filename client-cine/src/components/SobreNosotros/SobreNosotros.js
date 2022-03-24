import React from "react";
import { Link } from "react-router-dom";
import MapView from "../mapView/MapView.js";
import "./SobreNosotros.css"

const SobreNosotros = () => {

    return (
        <div className="SobreNosotros">
            <div className="SobreNosotros__title">
                <h1>Hello! welcome to Cinene</h1>
            </div>
            <div className="SobreNosotros__info">
                <p>
                    con mas de 0 años de experiencia, somos un cine de alta calidad para las queridas persona de nuestra localidad<br></br>
                    (y el unico) confiamos en nuestros empleados y su excelente atencion frente a las problematicas de dirigir un cine,<br></br>
                    usando metodos agiles para mantenerlo en la mejor condicion para que USTED pueda disfrutar la mejor calidad cinematografica posible,<br></br>
                    siempre al tanto de nuevos estrenos y unos productos de primera calidad para que usted la pase genial!<br></br>
                    Les esperamos en nuestro cine y recuerde nuestro lema.<br></br>
                    <br></br>
                    Quien madruga, Desayuna y va al cine!
                </p>
            </div>
            <div className="SobreNosotros__divisor">
                <div className="SobreNosotros__map">
                    <h1>Donde encontrarnos?</h1>
                    <MapView />
                </div>
                <div className="SobreNosotros__programmers">
                    <p>
                        Programado por:<br></br>
                        Agustin .(*￣０￣)ノ<br></br>
                        Dani  (。_。)<br></br>
                        Vicen(*゜ー゜*）<br></br>
                        Jonathan Σ(っ °Д °;)っ<br></br>
                        Alberto (ﾉ*･ω･)ﾉ<br></br>
                        Elian (´･ω･`)?<br></br>
                        Kevin (￣▽￣)"<br></br>
                    </p>
                </div>
            </div>
            <div>
                <Link to="/" className="SobreNosotros__back">❌Go Back❌</Link>
            </div>
        </div>
    )
}
export default SobreNosotros;