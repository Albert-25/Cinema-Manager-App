import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

export default function Product({ id, nombreProducto, imagenProducto, precio, stock }) {
    return (
        <>
            <Link to={`Products/${id}`}>
                <div
                    className="Product__All"
                    style={{ backgroundImage: `url('${imagenProducto}')` }}>
                    <div className="Product__ContainerImg">
                        <div className="Product__title">
                        {nombreProducto}
                        </div>
                        <div className="Product__info">
                            
                             {precio} $<br></br>
                            Quedan: {stock}!
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}