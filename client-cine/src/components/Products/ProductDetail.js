import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DetailedProduct } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import "./ProductDetail.css";
import Product from "./Product";

const ProductDetail = (props) => {
    const { user, currentUser, itemsCarrito, setItemsCarrito } = useAuth();
    let { id: code } = useParams();
    let [id] = useState(code);
    const dispatch = useDispatch();
    const detailed = useSelector((state) => state.ProductDetails);

    // console.log(detailed)

    useEffect(() => {
        dispatch(DetailedProduct(id));
    }, [id, dispatch]);



    // console.log("la ide detalles : ", id)
    let Produuct = [];
    if (detailed[0]) {
        Produuct = detailed[0];
    }

    function handleOnClick() {


        if(itemsCarrito)
        setItemsCarrito(itemsCarrito.concat({
            price: detailed.priceID,
            quantity: 1,
            name: detailed.nombreProducto
        }))
        console.log("carrrito:", itemsCarrito)
    }

    return (
        <div className="Background__Product">
            <div className="Product__titl">
                {detailed.nombreProducto || Produuct.nombreProducto}
            </div>

            <div className="product__container">
                <div className="Product__left">
                    <img
                        className="ProductImg__img"
                        src={detailed.imagenProducto || Produuct.imagenProducto}
                        alt="background"
                    ></img>
                </div>

                <div className="Product__right">
                    <div className="Product__sinopsis">
                        <h5>Descripcion:</h5>
                        {detailed.descripcion || Produuct.descripcion}
                    </div>
                    <div className="Product__duracion">
                        <h5>Precio: </h5>
                        {detailed.precio || Produuct.precio}
                        {" "}dolares
                    </div>
                    <div className="Product__clasificacion">
                        <h5>Stock: </h5>
                        {detailed.stock || Produuct.stock}
                        {" "} unidades
                    </div>
                    <button onClick={handleOnClick}>👉 Añadir 1 👈</button>

                </div>
            </div>
            <div className="container__button">
                <Link to="/productpage" className="Product__rightdown">
                    <button className="Product__rightdown__text">👉 Go back 👈</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductDetail;
