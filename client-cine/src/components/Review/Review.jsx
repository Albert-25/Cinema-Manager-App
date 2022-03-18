import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { postReview } from "../../store/actions"
// import styles from "./Review.module.css"

const Review = () => {

    const dispatch = useDispatch()

    const [comentario, setComentario] = useState()
    const [puntuación, setPuntuación] = useState()
    const nombre = "Anonimo";

    const onChange = (e) => {
        setComentario(e.target.value)
    }

    const onClick = number => {
        setPuntuación(number)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ nombre, comentario, puntuación })
        dispatch(postReview({ nombre, comentario, puntuación }))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Tu opinión nos importa, ¡Evalúa esta pelicula!</h3>
                <span>¿Cuántas estrellas le das a esta pelicula?</span>
                <span>(Selecciona de 1 a 5 estrellas en tu respuesta, siendo 1 la peor valoración y 5 la mejor).</span>
                <div >
                    <span onClick={() => onClick(1)}>★</span>
                    <span onClick={() => onClick(2)}>★</span>
                    <span onClick={() => onClick(3)}>★</span>
                    <span onClick={() => onClick(4)}>★</span>
                    <span onClick={() => onClick(5)}>★</span>
                </div>
                <div>
                    <h4>¡Cuéntanos que te pareció la pelicula!</h4>
                    <textarea cols="20" rows="10" onChange={onChange}></textarea>
                </div>
                <button>Publicar comentario</button>
            </form>
        </div>
    )
}

export default Review;