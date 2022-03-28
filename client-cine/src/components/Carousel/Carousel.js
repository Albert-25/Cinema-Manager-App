import Slider from "infinite-react-carousel"
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import React, { useState} from "react";
import "./Carousel.css"
let axiliar=[{
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
const Carousel = (AllMovies) => {

    let AllPelis = useSelector((state) => state.PelisAll)
    let arregloFinal =AllPelis.sort((a, b) =>a.puntuación < b.puntuación ? 1 : b.puntuación < a.puntuación ? -1 : 0)

    

    return (
        <>
         {arregloFinal.length>0?<section className='slider'>
        <h1 className='slider__title'>
            Estrenos imperdibles!
        </h1>
        <Slider className="slider__content" autoplay={true} autoplaySpeed={4000}>
            {
                arregloFinal.map(elm => {
                    return (<div className='slider__content--item' key={elm.id}>
                        <img src={elm.background} alt={elm.titulo}></img>
                        <Link to={`MovieDetails/${elm.id}`}>
                            <p className='slider-description'>{elm.titulo}</p>
                        </Link>

                    </div>)
                })
            }
        </Slider>
    </section>:<section className='slider'>
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