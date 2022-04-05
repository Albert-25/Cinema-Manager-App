import Slider from "infinite-react-carousel"
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import React from "react";
import Style from "./CarouselSmall.module.css"
let axiliar = [{
    id: 99998,
    titulo: "Movie Not found",
    sipnosis: "???",
    poster: "https://i.pinimg.com/originals/e1/fa/f6/e1faf61b8dad48e2f06ae555609bfa9d.jpg",
    duracion: "???",
    pais: "???",
    background: "https://i.pinimg.com/originals/e1/fa/f6/e1faf61b8dad48e2f06ae555609bfa9d.jpg",
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
    poster: "https://i.pinimg.com/originals/e1/fa/f6/e1faf61b8dad48e2f06ae555609bfa9d.jpg",
    duracion: "???",
    background: "https://i.pinimg.com/originals/e1/fa/f6/e1faf61b8dad48e2f06ae555609bfa9d.jpg",
    pais: "???",
    clasificacion: "???",
    director: "???",
    puntuación: "???",
    distribuidora: "???",
    genero: ["???"]
}]
const CarouselSmall = () => {

    let ProxPelis = useSelector((state) => state.NextReleases)



    return (
        <>
            {ProxPelis.length > 0 ? <section className={Style.smallslider}>
                <h1 className={Style.smallslider__title}>
                    Proximos estrenos!
                </h1>
                <Slider className={Style.smallslider__content} slidesPerRow={3} wheel={true} adaptiveHeight={true} >
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