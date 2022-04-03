import React, { useState, useEffect } from "react";
import "./ProductsPage.css";
import { useAuth } from "../../contexts/AuthContext";
import { AllProducts, postBuy } from "../../store/actions";
import NavBar from "../Navbar/navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import Products from "./Products";
import { Container } from 'react-bootstrap';
import { Util } from "leaflet";
import { Form, Button } from "react-bootstrap";


const ProductsPage = () => {
    const { itemsCarrito } = useAuth();
    const dispatch = useDispatch();
    const ProductosTotales = useSelector((state) => state.ProductAll);
    const UrlBuy = useSelector((state) => state.cartUrl);
    console.log("Estado cargado", UrlBuy);
    const [container, setContainer] = useState([]);
    useEffect(() => {
        dispatch(AllProducts());
    }, [dispatch]);
    console.log("items carrito", itemsCarrito)
    let Comprados = []
    itemsCarrito.map((e) => {
        Comprados.push({ name: e.name, quantity: e.quantity })
    })
    console.log("comprdos: ", Comprados)
    localStorage.setItem("BuyInfo", JSON.stringify(Comprados))

    const [orderPrice, setOrderPrice] = useState("")
    const [filterCombo, setFilterCombo] = useState("")


    React.useEffect(() => {
        if (container.length === 0) {
            console.log(ProductosTotales);
            setContainer(ProductosTotales);
        }
        setContainer(ProductosTotales);
    }, [ProductosTotales]);

    function handleOnClick() {
        alert("done");
        dispatch(postBuy(itemsCarrito));
        localStorage.setItem("compra", JSON.stringify(UrlBuy[0]));
    }

    let variable = 1;
    if (UrlBuy && UrlBuy[0] !== undefined && UrlBuy[0].length > 30 && variable === 1) {
        //window.open(UrlBuy[0])
        window.location.href = UrlBuy[0]
        console.log('Datos de entrada:', UrlBuy)
        localStorage.setItem('compra', UrlBuy[1])
        variable = variable - 1;
    }

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

            <button onClick={handleOnClick}>Submitr</button>
            <div>
                <div>
                    {itemsCarrito &&
                        itemsCarrito.map((item) => {
                            return <p>{item.name}</p>;
                        })}
                </div>
            </div>
        </>
    );
};
export default ProductsPage;
