import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DetailedProduct } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./ProductDetail.css";

const ProductDetail = (props) => {
    let { id: code } = useParams();
    let [id] = useState(code);
    const dispatch = useDispatch();
    const detailed = useSelector((state) => state.ProductDetails);

    console.log(detailed)

    useEffect(() => {
        dispatch(DetailedProduct(id));
    }, [id, dispatch]);



    // console.log("la ide detalles : ", id)
    let Produuct = [];
    if (detailed[0]) {
        Produuct = detailed[0];
    }

    return (
        <body className="Background__Product">
            <div className="Product__left">
                <img
                    className="ProductImg__img"
                    src={detailed.imagenProducto || Produuct.imagenProducto}
                    alt="background"
                ></img>
            </div>

            <div className="Product__right">
                <div className="Product__title">
                    {detailed.nombreProducto || Produuct.nombreProducto}
                </div>
                <div className="Product__sinopsis">
                    💖descripcion: {detailed.descripcion || Produuct.descripcion}
                </div>
                <div className="Product__duracion">
                    💖precio: {detailed.precio || Produuct.precio}
                </div>
                <div className="Product__clasificacion">
                    💖stock: {detailed.stock || Produuct.stock}
                </div>

            </div>
            <div className="">
                <Link to="/" className="Product__rightdown">
                    <p className="Product__rightdown__text">👉 Go back 👈</p>
                </Link>
            </div>
        </body>
    );
};

export default ProductDetail;
