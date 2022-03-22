import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllReviewByIdOfMovie } from "../../store/actions"
import styles from "./ReviewToShow.module.css"
import { DivStar } from "./styled"
import { useParams } from "react-router-dom"

const ReviewToShow = ({ id }) => {
    // const id = useParams().id;
    const comentarios = useSelector(state => state.PelisComments);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReviewByIdOfMovie(id))
    }, [dispatch])

    return (
        <div className={styles.container_main}>
            {
                comentarios && comentarios.map(c => {

                    return (
                        <div className={styles.container} key={c.id}>
                            <div><h3>{c.nombre}</h3></div>
                            <DivStar value="1" puntuacion={c.puntuación} className={styles.star} >★</DivStar>
                            <DivStar value="2" puntuacion={c.puntuación} className={styles.star} >★</DivStar>
                            <DivStar value="3" puntuacion={c.puntuación} className={styles.star} >★</DivStar>
                            <DivStar value="4" puntuacion={c.puntuación} className={styles.star} >★</DivStar>
                            <DivStar value="5" puntuacion={c.puntuación} className={styles.star} >★</DivStar>
                            <div><p>{c.comentario}</p></div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ReviewToShow;