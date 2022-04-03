import React from "react";
import { useState } from "react";

const ShoppingCart = () => {

    const [cantidad, setCantidad] = useState(0);
    const [costo, setCosto] = useState(10);
    const [costototal, setCostototal] = useState(0);

    const onClickLess = () => {
        setCantidad(cantidad-1)
        setCostototal(costototal-costo)
    }
    const onClickMore = () => {
        setCantidad(cantidad+1)
        setCostototal(costototal+costo)
    }


    return (
        <div>
            <h2>Selecciona cuantas entradas quieres</h2>
            <h4>Cantidad:</h4>
            <div>
                <button onClick={onClickLess}>-</button>
                <span>{" "}{cantidad}{" "}</span>
                <button onClick={onClickMore}>+</button>
            </div>
            <h4>Costo:</h4>
            <span>{costo} usd</span>
            <h4>Costo total:</h4>
            <span>{costototal}</span>
        </div>
    )
}

export default ShoppingCart;