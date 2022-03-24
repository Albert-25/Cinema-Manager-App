import React from 'react'
import Slider from "infinite-react-carousel"
import { useSelector, useDispatch } from "react-redux";
import "./Carousel.css"
import { Link } from 'react-router-dom';

const Carousel = (BestMovies) => {
    const BestPelis = useSelector((state) => state.TopPelis)
    console.log('Mejores en car', BestPelis)

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
    }else{
        return (<></>)
    }



}

export default Carousel