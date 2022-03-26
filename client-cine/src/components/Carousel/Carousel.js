import Slider from "infinite-react-carousel"
import { useSelector } from "react-redux";
import "./Carousel.css"
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const Carousel = (AllMovies) => {

    const [auxilio, setAuxilio] = useState([{
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
    }]);

    const AllPelis = useSelector((state) => state.PelisAll)
    let arregloFinal = []

    React.useEffect(() => {
        if (AllPelis.length !== 0 && auxilio.length === 2) {
            // console.log('all', AllPelis)
            // console.log('arrais: ', arrais)
            let pelis = [...AllPelis]
            let arreglar = pelis.sort((a, b) =>
                a.puntuación < b.puntuación ? 1 : b.puntuación < a.puntuación ? -1 : 0
            )
            arregloFinal = arreglar.slice(0, 3)
            console.log("arreglo final del carrusel: ", arregloFinal)
            setAuxilio(arregloFinal)
        }
    }, [AllPelis]);

    return (<section className='slider'>
        <h1 className='slider__title'>
            Estrenos imperdibles!
        </h1>
        <Slider className="slider__content" autoplay={true} autoplaySpeed={4000}>
            {
                auxilio.map(elm => {
                    return (<div className='slider__content--item' key={elm.id}>
                        <img src={elm.background} alt={elm.titulo}></img>
                        <Link to={`MovieDetails/${elm.id}`}>
                            <p className='slider-description'>{elm.titulo}</p>
                        </Link>

                    </div>)
                })
            }
        </Slider>
    </section>)
}

export default Carousel