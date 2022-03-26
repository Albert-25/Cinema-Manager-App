import React, { useState, useEffect } from "react";
import "./ProductsPage.css"
import {
    AllProducts
} from "../../store/actions";
import NavBar from "../Navbar/navbar.jsx";

import { useSelector, useDispatch } from "react-redux";

import Products from "./Products";

const ProductsPage = () => {
    const dispatch = useDispatch();

    const ProductosTotales = useSelector((state) => state.ProductAll);

    const [container, setContainer] = useState([]);


    useEffect(() => {
        dispatch(AllProducts());
    }, [dispatch]);

    React.useEffect(() => {

        if (container.length === 0) {
            console.log(ProductosTotales)
            setContainer(ProductosTotales);
        }
        // if (ProductosFiltradas.length !== 0) {
        //   //Si no hay Productos encontradas popea una alerta y vacía el estado
        //   if (
        //     ProductosFiltradas[0].titulo &&
        //     ProductosFiltradas[0].titulo === "Movie Not found"
        //   ) {
        //     Swal.fire("No se encontro peliculas con estos filtros.", "", "error");
        //     // alert("No movie found with that sorting");
        //     ProductosFiltradas.pop();
        //   } else {
        //     setContainer(ProductosFiltradas);
        //   }
        // }
    }, [ProductosTotales]);







    return (
        <div className="Product__Background">
            <div>
                <NavBar></NavBar>
            </div>
            <div><h1>"-"</h1></div>
            <div>
                <h1>Vengan y compren!</h1>
            </div>
            <div className="Product__Productos__container">
                <Products className="Product__Productos" productsInfo={container}></Products>
            </div>

        </div>


    )

};
export default ProductsPage;