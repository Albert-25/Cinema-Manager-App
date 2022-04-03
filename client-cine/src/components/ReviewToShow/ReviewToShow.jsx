import React from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllReviewByIdOfMovie, deleteReview } from "../../store/actions"
import styles from "./ReviewToShow.module.css"
import { DivStar } from "./styled"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext";

const ReviewToShow = ({ id }) => {

    const comentarios = useSelector(state => state.PelisComments);
    const dispatch = useDispatch();
    const { user, currentUser } = useAuth();

    useEffect(() => {
        dispatch(getAllReviewByIdOfMovie(id))
    }, [dispatch])

    /*useEffect(() => {
        dispatch(getAllReviewByIdOfMovie(id))
    }, [dispatch, id])*/

    const handleDelete = (idOfComment) => {
        dispatch(deleteReview(idOfComment))
    }
    const Botones = ({ id }) => {
        return (
            <div>
                <button onClick={() => handleDelete(id)}>delete</button>
                <Link to={`/reviewtoupdate/${id}`}><button>edit</button></Link>
            </div>
        )
    }

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
                            {currentUser ? c.nombre === user.nombre ? <Botones id={c.id} /> : null : null}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ReviewToShow;