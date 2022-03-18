import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllReview } from "../../store/actions"
// import styles from "./ReviewToShow.module.css"

const ReviewToShow = () => {
    // const [] = useState();
    const comentarios = useSelector(state => state.ProductComments);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReview())
    }, [dispatch])

    return (
        <div>
            {
                comentarios && comentarios.map(c => {
                    return (
                        <div key={c.id}>
                            <h3>{c.nombre}</h3>
                            <div>{c.puntuación}</div>
                            <p>{c.comentario}</p>
                            <br></br>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ReviewToShow;