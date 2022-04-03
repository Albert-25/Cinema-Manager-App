import React, { useState, useEffect } from "react";
import "./ProductsPage.css"
import { useAuth } from "../../contexts/AuthContext";
import {
    AllProducts,
    postBuy
} from "../../store/actions";
import NavBar from "../Navbar/navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import Products from "./Products";
import { Container } from 'react-bootstrap';
import { Util } from "leaflet";
import { Form, Button } from "react-bootstrap";


const ProductsPage = () => {
    const { itemsCarrito} = useAuth();
    const dispatch = useDispatch();
    const ProductosTotales = useSelector((state) => state.ProductAll);
    const UrlBuy = useSelector((state) => state.cartUrl);
    console.log(UrlBuy)
    const [container, setContainer] = useState([]);
    useEffect(() => {
        dispatch(AllProducts());
    }, [dispatch]);
    console.log("items carrito", itemsCarrito)
    const [orderPrice, setOrderPrice] = useState("")
    const [filterCombo, setFilterCombo] = useState("")

    /*React.useEffect(() => {
        if (container.length === 0) {
            console.log(ProductosTotales)
            setContainer(ProductosTotales);
        }
    }, [ProductosTotales, container]);*/

       React.useEffect(() => {
        if (container.length === 0) {
            console.log(ProductosTotales)
            setContainer(ProductosTotales);
        }
        setContainer(ProductosTotales);
    }, [ProductosTotales]);

    function handleOnClick() {
        alert("done")
        dispatch(postBuy(itemsCarrito));
    }

    if (UrlBuy !== undefined && UrlBuy.length > 30) {
        window.open(UrlBuy)
    }

    console.log("aqui productostotales p", ProductosTotales)
    const handleFilterPrice = e => {
        dispatch({ type: "FILTER_BYPRICE", payload: e.target.value })
        setOrderPrice(`order: ${e.target.value}`)
    }

    const handleFilterByCombo = e =>{
        dispatch({ type: "FILTER_BYCOMBO", payload: e.target.value })
        setFilterCombo(`combo: ${e.target.value}`)
    }

    return (
        <>
            <NavBar />
            <Container className="products_main_container" fluid="ls">
                <Form.Select className="filterByRating" onChange={handleFilterPrice}>
                    <option selected disabled={true}>Select Price Order</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </Form.Select >
                <Form.Select fluid="ls" onChange={handleFilterByCombo}>
                    <option value="all">Todos los productos</option>
                    <option value="true">con combo</option>
                    <option value="false">sin combo</option>
                </Form.Select>
                <Products className="Product__Productos" productsInfo={container}></Products>
            </Container>

            <button onClick={handleOnClick} >Submitr</button>
            <div>
                <div>{itemsCarrito && itemsCarrito.map((item) => {
                    return (<p>{item.name}</p>)
                })}</div>

            </div>

        </>
    )

};
export default ProductsPage;