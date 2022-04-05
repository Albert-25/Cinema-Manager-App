import Slider from "infinite-react-carousel"
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import "./Carousel.css"
let axiliar = [{
    id: 99998,
    titulo: "Movie Not found",
    sipnosis: "???",
    poster: "https://i.ytimg.com/vi/g13gs5a8HZ4/hqdefault.jpg",
    duracion: "???",
    pais: "???",
    background: "https://i.ytimg.com/vi/g13gs5a8HZ4/hqdefault.jpg",
    clasificacion: "???",
    director: "???",
    puntuación: "???",
    distribuidora: "???",
    genero: ["???"]
},
{
    id: 99999,
    titulo: "Movie Not found2",
    sipnosis: "???",
    poster: "https://i.ytimg.com/vi/g13gs5a8HZ4/hqdefault.jpg",
    duracion: "???",
    background: "https://i.ytimg.com/vi/g13gs5a8HZ4/hqdefault.jpg",
    pais: "???",
    clasificacion: "???",
    director: "???",
    puntuación: "???",
    distribuidora: "???",
    genero: ["???"]
}]
const Carousel = () => {

    let AllPelis = useSelector((state) => state.PelisAll)
    let arregloFinal = AllPelis.sort((a, b) => a.puntuación < b.puntuación ? 1 : b.puntuación < a.puntuación ? -1 : 0)
    let BestTres = arregloFinal.slice(0,3)
    console.log(BestTres)



    return (
        <>
            {BestTres.length > 0 ? <section className='slider'>
                <h1 className='slider__title'>
                    Estrenos imperdibles!
                </h1>
                <Slider className="slider__content" autoplay={true} autoplaySpeed={4000}>
                    {
                        BestTres.map(elm => {
                            return (<div className='slider__content--item' key={elm.id}>
                                <img src={elm.background} alt={elm.titulo}></img>
                                <Link to={`MovieDetails/${elm.id}`}>
                                    <p className='slider-description'>{elm.titulo}</p>
                                </Link>

                            </div>)
                        })
                    }
                </Slider>
            </section> : <section className='slider'>
                <h1 className='slider__title'>
                    Estrenos imperdibles!
                </h1>
                <Slider className="slider__content" autoplay={true} autoplaySpeed={4000}>
                    {
                        axiliar.map(elm => {
                            return (<div className='slider__content--item' key={elm.id}>
                                <img src={elm.background} alt={elm.titulo}></img>
                                <Link to={`MovieDetails/${elm.id}`}>
                                    <p className='slider-description'>{elm.titulo}</p>
                                </Link>

                            </div>)
                        })
                    }
                </Slider>
            </section>}
        </>)
}

export default Carousel