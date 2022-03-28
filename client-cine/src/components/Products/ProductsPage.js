import React, { useState, useEffect } from "react";
import "./ProductsPage.css"
import {
    AllProducts
} from "../../store/actions";
import NavBar from "../Navbar/navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import Products from "./Products";
import {Container} from 'react-bootstrap';

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
        <>
        <NavBar/>
        <Container className="products_main_container" fluid="ls">
           <Products className="Product__Productos" productsInfo={container}></Products>
        </Container>

        </>
    )

};
export default ProductsPage;