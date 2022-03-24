import React from 'react'
import Slider from "infinite-react-carousel"
import { useSelector } from "react-redux";
import "./Carousel.css"
import { Link } from 'react-router-dom';

const Carousel = (BestMovies) => {
    const BestPelis = useSelector((state) => state.TopPelis)
    // console.log(BestPelis)

    if (BestPelis.length === 3) {
        return <section className='slider'>
            <h1 className='slider__title'>
                Estrenos imperdibles!
            </h1>
            <Slider className="slider__content" >
                {
                    BestPelis.map(BestPelis =>
                        <div className='slider__content--item' key={BestPelis.id}>
                            <img src={BestPelis.poster} alt={BestPelis.titulo}></img>
                            <Link to={`MovieDetails/${BestPelis.id}`}>
                                <p className='slider-description'>{BestPelis.titulo}</p>
                            </Link>

                        </div>)
                }
            </Slider>
        </section>
    } else {
        return (<></>)
    }

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
        <Slider className="slider__content" autoplay={true} autoplaySpeed={6000}>
            {
                auxilio.map(elm => {
                    return (<div className='slider__content--item' key={elm.id}>
                        <img src={elm.poster} alt={elm.titulo}></img>
                        <Link to={`MovieDetails/${elm.id}`}>
                            <p className='slider-description'>{elm.titulo}</p>
                        </Link>

}

export default Carousel