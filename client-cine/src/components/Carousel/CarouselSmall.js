import Slider from "infinite-react-carousel"
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import Style from "./CarouselSmall.module.css"
let axiliar = [{
    id: 1,
    titulo: "Movie Not found",
    sipnosis: "???",
    poster: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/4QNRHYDIZFEJTINRQFU5BSVHSA.jpg",
    duracion: "???",
    pais: "???",
    clasificacion: "???",
    director: "???",
    puntuación: "???",
    distribuidora: "???",
    genero: ["???"]
},
{
    id: 2,
    titulo: "Movie Not found2",
    sipnosis: "???",
    poster: "https://www.cinemascomics.com/wp-content/uploads/2019/02/habra-zootropolis-2-zootopia-2.jpg?mrf-size=m",
    duracion: "???",
    background: "https://www.cinemascomics.com/wp-content/uploads/2019/02/habra-zootropolis-2-zootopia-2.jpg?mrf-size=m",
    pais: "???",
    clasificacion: "???",
    director: "???",
    puntuación: "???",
    distribuidora: "???",
    genero: ["???"]
}]
const CarouselSmall = () => {

    let ProxPelis = useSelector((state) => state.PelisAll)



    return (
        <>
            {ProxPelis.length > 0 ? <section className={Style.smallslider}>
                <h1 className={Style.smallslider__title}>
                    Proximos estrenos!
                </h1>
                <Slider className={Style.smallslider__content} slidesPerRow={5} wheel={true} adaptiveHeight={true} >
                    {
                        ProxPelis.map(elm => {
                            return (<div className={Style.smallslider__content__item} key={elm.id}>
                                <Link to={`MovieDetails/${elm.id}`}>
                                <img src={elm.background} alt={elm.titulo}></img>
                                </Link>

                            </div>)
                        })
                    }
                </Slider>
            </section> : <section className={Style.smallslider}>
                <h1 className={Style.smallslider__title}>
                    Estrenos imperdibles!
                </h1>
                <Slider className={Style.smallslider__content} slidesPerRow={5} wheel={true} adaptiveHeight={true}>
                    {
                        axiliar.map(elm => {
                            return (<div className={Style.smallslider__content__item} key={elm.id}>
                                <img src={elm.background} alt={elm.titulo}></img>
                                <Link to={`MovieDetails/${elm.id}`}>
                                    <p className={Style.smallslider_description}>{elm.titulo}</p>
                                </Link>

                            </div>)
                        })
                    }
                </Slider>
            </section>}
        </>)
}

export default CarouselSmall