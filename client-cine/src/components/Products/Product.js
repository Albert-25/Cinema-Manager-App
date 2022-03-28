import React from "react";
import { Link } from "react-router-dom";
import {Card} from 'react-bootstrap'
import "./Product.css";

export default function Product({ id, nombreProducto, imagenProducto, precio, stock }) {
    return (
        <>
            <Link to={`Products/${id}`}>
                 <Card className="bg-dark text-black">
                    <Card.Img src={imagenProducto} alt="Card image" />
                    <Card.ImgOverlay>
                    <Card.Title>{nombreProducto}</Card.Title>
                    <Card.Text>
                         Precio :{precio}
                    </Card.Text>
                   <Card.Text>Stock: {stock}!</Card.Text>
                      </Card.ImgOverlay>
                 </Card>
            </Link>
        </>
    )
}