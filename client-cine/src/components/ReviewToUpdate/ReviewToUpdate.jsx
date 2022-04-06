import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateReview } from "../../store/actions"
import styles from "./ReviewToUpdate.module.css"
import { DivStar } from "./styled"
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2"

const ReviewToUpdate = () => {

    let navigate = useNavigate();
    const id = useParams().id;

    const dispatch = useDispatch()
    const [comentario, setComentario] = useState("")
    const [puntuación, setPuntuación] = useState()
    const [calificacion, setCalificacion] = useState("")
    const [errorPuntuacion, setErrorPuntuacion] = useState("")
    const [errorComentario, setErrorComentario] = useState("")
    const [error2Comentario, setError2Comentario] = useState("")
    // const nombre = "Anonimo";
    const { user } = useAuth();
    let nombre = user && user.nombre ? user.nombre : "Anonimo"


    const onChange = (e) => {
        setComentario(e.target.value)
        setError2Comentario("")
    }
    const onClick = number => {
        setPuntuación(number)
        switch (number) {
            case 1: {
                setCalificacion("Mala")
                break
            }
            case 2: {
                setCalificacion("Aceptable")
                break
            }
            case 3: {
                setCalificacion("Normal")
                break
            }
            case 4: {
                setCalificacion("Buena")
                break
            }
            case 5: {
                setCalificacion("Excelente")
                break
            }default: {

    }
        }
        setErrorPuntuacion("")
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (puntuación == null) setErrorPuntuacion("es necesario calificar esta pelicula")
        if (!comentario.trim()) setError2Comentario("es necesario rellenar este campo")
        dispatch(updateReview({ nombre, comentario, puntuación, id }))
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Comentario editado!',
            showConfirmButton: false,
            timer: 1000
          })
        navigate(-1)
    }

    useEffect(() => {
        if (comentario.length >= 601) {
            setErrorComentario("se permiten como maximo 600 carácteres")
        }
        else {
            setErrorComentario("")
        }
    })

    /*useEffect(() => {
        if (comentario.length >= 601) {
            setErrorComentario("se permiten como maximo 600 carácteres")
        }
        else {
            setErrorComentario("")
        }
    },[comentario.length])*/

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h3>Tu opinión nos importa, ¡Evalúa esta pelicula!</h3>
                <span>¿Cuántas estrellas le das a esta pelicula?</span>
                <div className={styles.star_div}>
                    <DivStar value="1" puntuacion={puntuación} className={styles.star} onClick={() => onClick(1)}>★</DivStar>
                    <DivStar value="2" puntuacion={puntuación} className={styles.star} onClick={() => onClick(2)}>★</DivStar>
                    <DivStar value="3" puntuacion={puntuación} className={styles.star} onClick={() => onClick(3)}>★</DivStar>
                    <DivStar value="4" puntuacion={puntuación} className={styles.star} onClick={() => onClick(4)}>★</DivStar>
                    <DivStar value="5" puntuacion={puntuación} className={styles.star} onClick={() => onClick(5)}>★</DivStar>
                    <span className={styles.calificacion}>{calificacion}</span>
                </div>
                <div className={styles.error}>{errorPuntuacion}</div>
                <div>
                    <h4>¡Cuéntanos que te pareció la pelicula!</h4>
                    <textarea cols="20" rows="10" onChange={(e) => onChange(e)}></textarea>
                </div>
                <div className={styles.error}>{errorComentario}</div>
                <div className={styles.error}>{error2Comentario}</div>
                <button >Publicar comentario</button>
            </form>
        </div>
    )
};

export default ReviewToUpdate;