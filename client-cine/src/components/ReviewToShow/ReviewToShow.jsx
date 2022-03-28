import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllReviewByIdOfMovie, deleteReview } from "../../store/actions"
import styles from "./ReviewToShow.module.css"
import { DivStar } from "./styled"


const ReviewToShow = ({ id }) => {

    const comentarios = useSelector(state => state.PelisComments);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReviewByIdOfMovie(id))
    }, [dispatch])

    // const handleDelete = (idOfComment) => {
    //     dispatch(deleteReview(idOfComment))
    // }

    return (
        <div className={styles.container_main}>
            {
                comentarios && comentarios.map(c => {

                    return (
                        <div className={styles.container} key={c.id}>
                            <div className={styles.nombre}> Por {c.nombre}</div>
                            <DivStar value="1" puntuacion={c.puntuación} className={styles.star} >★</DivStar>
                            <DivStar value="2" puntuacion={c.puntuación} className={styles.star} >★</DivStar>
                            <DivStar value="3" puntuacion={c.puntuación} className={styles.star} >★</DivStar>
                            <DivStar value="4" puntuacion={c.puntuación} className={styles.star} >★</DivStar>
                            <DivStar value="5" puntuacion={c.puntuación} className={styles.star} >★</DivStar>
                            <div className={styles.comentario}><p>{c.comentario}</p></div>
                            {/* <button onClick={() => handleDelete(c.id)}>delete</button> */}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ReviewToShow;