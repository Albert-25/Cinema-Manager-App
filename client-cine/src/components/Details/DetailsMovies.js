import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DetailedMovie } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import "./DetailsMovies.css";

const DetailsMovies = (props) => {
    let id = props.match.params.id;
    // console.log("props", props)
    const dispatch = useDispatch();
    const detailed = useSelector((state) => state.PelisDetails);

    useEffect(() => {
        dispatch(DetailedMovie(id));
    }, [id, dispatch]);

    // let TempArray = []

    // console.log("la ide detalles : ", id)
    let Mooovie = [];
    if (detailed[0]) {
        Mooovie = detailed[0];
    }

    return (
        <body className="Background__Details">
            <div className="Details__left">
                <img
                    className="MovieImg__img"
                    src={detailed.poster || Mooovie.poster}
                    alt="background"
                ></img>
            </div>

            <div className="Details__right">
                <div className="Details__title">
                    {detailed.titulo || Mooovie.titulo}
                </div>
                <div className="Details__sipnosis">
                    💖sipnosis: {detailed.sipnosis || Mooovie.sipnosis}
                </div>
                <div className="Details__duracion">
                    💖duracion: {detailed.duracion || Mooovie.duracion}
                </div>
                <div className="Details__clasificacion">
                    💖clasificacion: {detailed.clasificacion || Mooovie.clasificacion}
                </div>
                <div className="Details__director">
                    💖director: {detailed.director || Mooovie.director}
                </div>
                <div className="Details__puntuación">
                    💖puntuación: {detailed.puntuación || Mooovie.puntuación}
                </div>
                <div className="Details__pais">
                    💖pais: {detailed.pais || Mooovie.pais}
                </div>
                <div className="Details__distribuidora">
                    💖distribuidora: {detailed.distribuidora || Mooovie.distribuidora}
                </div>
                <div className="Details__trailer">
                    💖trailer: {detailed.trailer || Mooovie.trailer}
                </div>
            </div>
            <div className="">
                <Link to="/home" className="Details__rightdown">
                    <p className="Details__rightdown__text">👉 Go back 👈</p>
                </Link>
            </div>
        </body>
    );
};

export default DetailsMovies;
